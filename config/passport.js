'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const Story = require('../api/story/story.model');

module.exports = function passportConfig(app) {
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || 1586521245008399,
      clientSecret: process.env.FACEBOOK_APP_SECRET || '2206b22e1c14cc76f031f9a05728693c',
      callbackURL: 'http://localhost:' + app.get('port') + '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email']
    },
    function getAccessToken (accessToken, refreshToken, profile, cb) {
      let story = {
        userId: profile.id,
        displayName: profile.displayName
      };
      Story.findOneAndUpdate({userId: story.userId}, story, {upsert:true, new:true}, function(err, storyFromDB){
        return cb(err, storyFromDB);
      });
    }
  ));
  
  passport.serializeUser(function passportSerialize (story, done) {
    done(null, story._id);
  });
  
  passport.deserializeUser(function(id, done) {
    Story.findById(id, function (err, user) {
      done(err, user);
    });
  });
  
  app.use(passport.initialize());
  app.use(passport.session({
    secret: 'my111Madafaking.*Niggas!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
};
