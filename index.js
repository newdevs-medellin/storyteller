'use strict';
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
  res.render('home');
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function appListening() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
