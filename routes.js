'use strict';

module.exports = function (app) {
  // Insert routes below
  // app.use('/api/v1/story', require('./api/story'))

  app.get('/', function(req, res) {
    res.render('hello');
  });
};
