'use strict';
const passport = require('passport');

module.exports = function passportConfig(app) {
  app.use('/api/v1/story', require('./api/story'));

  app.get('/', function expressRequestHandling(req, res) {
    res.render('home');
  });
  
  /* if you need to move the following endpoints feel free to do it!!! */
  app.get('/auth/facebook',
    passport.authenticate('facebook'));
  
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function succesAuth(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};
