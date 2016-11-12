'use strict';
const storyModel = require('./story.model');

const handleError = function handleError(err, res) {
  return res.status(400).json({error: err});
};

exports.post = function (req, res) {
  storyModel.create(req.body, function (err, data) {
    if (err) return handleError(err, res);
    return res.status(200).json({data: data});
  });
};

exports.getById = function (req, res) {
  storyModel.findById(req.params.id, function (err, story) {
    if (err) return handleError(err, res);
    return res.status(200).json({data: story});
  });
};

exports.get = function (req, res) {
  storyModel.find({}, function (err, stories) {
    if (err) return handleError(err, res);
    return res.status(200).json({data: stories});
  });
};
