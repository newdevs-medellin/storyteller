'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {"userId":"xxx","messageId":"yyy","sentence":"zzz","nouns":[{"noun": "one", "imgUrl":"imageOne"}, {"noun": "two", "imgUrl":"imageTwo"},{"noun": "three", "imgUrl":"imageThree"}]}

const storySchema = new Schema({
  userId: String,
  displayName: String,
  sentence: String,
  nouns: Array
});

module.exports = mongoose.model('story', storySchema);
