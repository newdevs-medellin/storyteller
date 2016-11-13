'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  stories: Array
});

module.exports = mongoose.model('user', userSchema);

