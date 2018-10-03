var express = require('express');
var router = express.Router();
var betvictor = require('../../betvictor');

router.get(['/', '/sports'], function(req, res, next) {
  betvictor.getSports(req.lang).then((data) => {
    return res.json(data);
  });
});

router.get('/sports/:sport', function(req, res, next) {

  betvictor.getSport(req.lang, req.params.sport).then((data) => res.json(data));

});


module.exports = router;
