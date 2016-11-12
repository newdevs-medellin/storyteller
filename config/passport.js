'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

module.exports = function(app) {
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || 1586521245008399,
      clientSecret: process.env.FACEBOOK_APP_SECRET || '2206b22e1c14cc76f031f9a05728693c',
      callbackURL: 'http://localhost:' + app.get('port') + '/auth/facebook/callback'
    },
    function getAccessToken (accessToken, refreshToken, profile, cb) {
      let dummyUser = {
        id: profile.id,
        email: 'blablabla@test.com'
      };
      
      return cb(null, dummyUser);
      
      /*
       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
       return cb(err, user);
       });
       */
    }
  ));
  
  passport.serializeUser(function passportSerialize (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function passportDeserialize (id, done) {
    done(null, id);
  });
  
  app.use(passport.initialize());
  app.use(passport.session());
};
