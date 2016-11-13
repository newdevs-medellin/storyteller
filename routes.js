'use strict';
const passport = require('passport');

module.exports = function passportConfig(app) {
  app.use('/api/v1/story', require('./api/story'));

  app.get('/', function expressRequestHandling(req, res) {
    res.render('home');
  });

  app.get('/start', function expressRequestHandling(req, res) {
    res.render('start');
  });

  /* if you need to move the following endpoints feel free to do it!!! */
  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
    function succesAuth(req, res) {
      res.redirect('/');
    });
  
  app.get('/auth/failed', function expressRequestHandling(req, res) {
    res.render('home');
  });
};
