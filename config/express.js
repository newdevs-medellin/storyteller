'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');


module.exports = function expressConfig(app) {
  app.set('view engine', 'handlebars');
  app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use('/assets', express.static('assets'));
  app.set('port', process.env.PORT || 5000);
  app.use(session({
    secret: 'my111Madafaking.*Niggas!',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
};
