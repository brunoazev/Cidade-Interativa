var express = require('express');
var router = express.Router();
var feedAction = require('../actions/feed.js');
console.log("feeds routing...");
router.get('/', feedAction.get);
router.post('/', feedAction.put);

module.exports = router;
