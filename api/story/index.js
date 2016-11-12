'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./story.controller');

router.post('/', controller.post);
router.get('/:id', controller.getById);
router.get('/', controller.get);

module.exports = router;
