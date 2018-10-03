var express = require('express');
var router = express.Router();
var betvictor = require('../../betvictor');

router.get(['/', '/sports'], (req, res, next) => {
  betvictor.getSports(req.lang).then((data) => {
    res.json(data)
  });
});

router.get('/sports/:sport', (req, res, next) => {
  betvictor.getSport(req.lang, req.params.sport).then((data) => {
    res.json(data)
  });
});

router.get('/sports/:sport/events', (req, res, next) => {
  betvictor.getEvents(req.lang, req.params.sport).then((data) => {
    res.json(data)
  });
});

router.get('/sports/:sport/events/:event', (req, res, next) => {
  betvictor.getEvent(req.lang, req.params.sport, req.params.event).then((data) => {
    res.json(data)
  });
});

module.exports = router;
