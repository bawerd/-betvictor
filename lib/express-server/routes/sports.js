var express = require('express');
var router = express.Router();
var betvictor = require('../../betvictor');

router.get('/', function(req, res, next) {

  betvictor.getSports().then((data) => {
    return res.json(data);
  });

});

module.exports = router;
