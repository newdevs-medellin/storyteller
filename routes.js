'use strict';

module.exports = function (app) {
  app.use('/api/v1/story', require('./api/story'));

  app.get('/', function(req, res) {
    res.render('hello');
  });
};
