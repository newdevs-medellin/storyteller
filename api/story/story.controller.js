'use strict';

exports.post = function (req, res) {
  return res.status(200).json({post: true});
};

exports.getById = function (req, res) {
  return res.status(200).json({getById: true});
};

exports.get = function (req, res) {
  return res.status(200).json({get: true});
};
