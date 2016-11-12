'use strict';
const express = require('express');
const app = express();
require('./config/express')(app);
require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
