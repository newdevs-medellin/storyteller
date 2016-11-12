'use strict';
const express = require('express');
const app = express();
require('./config/express')(app);
require('./config/passport')(app);
require('./routes')(app);

app.listen(app.get('port'), function appListener() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
