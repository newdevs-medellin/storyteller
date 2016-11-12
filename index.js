'use strict';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('./config/express')(app);
require('./config/passport')(app);
require('./routes')(app);

// mongoose.connect('mongodb://localhost/storyteller', {});
mongoose.connect('mongodb://storyteller:storyteller@ds151707.mlab.com:51707/storyteller', {});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
