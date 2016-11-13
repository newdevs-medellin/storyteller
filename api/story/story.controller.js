'use strict';
const ai = require('apiai');
const agent = ai("9f37a89a1b504474b2704c16498a4c60");
const storyModel = require('./story.model');

const handleError = function handleError(err, res) {
  return res.status(400).json({error: err});
};

exports.post = function (req, res) {
  let data = req.body;
  data.nouns = [];
  // Process sentence
  let nlp = agent.textRequest(data.sentence);
  nlp.on('response', function(response) {
    // Character is defined in first sentence
    if(response.result.action === 'p1'){
      // Main Character
      let character = response.result.parameters.character;
      data.nouns.push({'character': character});
    }

    storyModel.create(data, function (err, data) {
      if (err) return handleError(err, res);
      return res.status(200).json({data: data});
    });

  });
  nlp.on('error', function(error) {
    console.log(error);
    return res.status(500).json({error: error});
  });
  nlp.end();
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
