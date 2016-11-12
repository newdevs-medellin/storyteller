'use strict';

exports.post = function postRequestHandling(req, res) {
  return res.status(200).json({post: true});
};

exports.getById = function getRequestHandling(req, res) {
  return res.status(200).json({getById: true});
};

exports.get = function listRequestHandling(req, res) {
  return res.status(200).json({get: true});
};
