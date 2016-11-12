'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
// const cookieParser = require('cookie-parser');
// const passport = require('passport');

module.exports = function(app) {
  app.set('view engine', 'handlebars');
  app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // app.use(cookieParser());
  // app.use(passport.initialize());
  app.use('/assets', express.static('assets'));
  app.set('port', (process.env.PORT || 5000));
};
