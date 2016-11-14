'use strict';
const passport = require('passport');
const Story = require('./api/story/story.model');

module.exports = function passportConfig(app) {
  app.use('/api/v1/story', require('./api/story'));

  app.get('/', function expressRequestHandling(req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/start/:storyId', function expressRequestHandling(req, res) {
    Story.findById(req.params.storyId, function (err, currentStory) {
      return res.render('start', { story: currentStory });
    });
  });

  /* if you need to move the following endpoints feel free to do it!!! */
  app.get('/auth/facebook',
    passport.authenticate('facebook',{session: false}));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/failed' }),
    function succesAuth(req, res) {
      res.redirect('/start/'+req.user._id);
    });
  
  app.get('/auth/failed', function expressRequestHandling(req, res) {
    res.render('home', {loginFailedMessage:'Your login failed, please try it again!!!'});
  });
};
