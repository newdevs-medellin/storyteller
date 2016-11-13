'use strict';
const storyModel = require('./story.model');
const request = require('request');
const Q = require('q');

const handleError = function handleError(err, res) {
  return res.status(400).json({error: err});
};

exports.post = function (req, res) {
  Promise.all(req.body.sentence.split(' ').map(function (word) {
    return getGif(word).then(function (value) {
      return {noun: word, imgUrl: value};
    });
  })).then(function (result) {
    req.body.nouns = result;
    storyModel.create(req.body, function (err, data) {
      if (err) return handleError(err, res);
      console.log('req.body', req.body);
      return res.status(200).json({data: data});
     });
  }, function (reason) {
    console.log('reason', reason);
    return reason;
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

function getGif (word) {
  let deferred = Q.defer();
  request.get(`http://api.giphy.com/v1/gifs/search?q=${word}&limit=1&api_key=dc6zaTOxFJmzC`, function (error, response, body) {
    let bodyObj = JSON.parse(body);
    if(bodyObj.data.length) {
      deferred.resolve(bodyObj.data[0].embed_url);
    }else{
      deferred.resolve('');
    }
  });
  return deferred.promise;
};
