'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../api/user/user.model');

module.exports = function passportConfig(app) {
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || 1586521245008399,
      clientSecret: process.env.FACEBOOK_APP_SECRET || '2206b22e1c14cc76f031f9a05728693c',
      callbackURL: 'http://localhost:' + app.get('port') + '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email']
    },
    function getAccessToken (accessToken, refreshToken, profile, cb) {
      let user = {
        facebookId: profile.id,
        displayName: profile.displayName
      };
      User.findOneAndUpdate(user.facebookId, user, {upsert:true, new:true}, function(err, userFromDB){
        return cb(err, userFromDB);
      });
    }
  ));
  
  passport.serializeUser(function passportSerialize (user, done) {
    done(null, user.facebookId);
  });
  
  passport.deserializeUser(function passportDeserialize (id, done) {
    done(null, id);
  });
  
  app.use(passport.initialize());
  app.use(passport.session());
};
