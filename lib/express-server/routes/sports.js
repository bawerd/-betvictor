var express = require('express');
var router = express.Router();
var betvictor = require('../../betvictor');

router.get('/', function(req, res, next) {
  return res.json({});
});

module.exports = router;
