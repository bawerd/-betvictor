const express = require('express');
const app = express();
const sportsRouter = require('./routes/sports');
const betvictor = require('../betvictor');



app.param('lang', (req, res, next, lang) => {
  req.lang = lang;
  next();
});

app.use('/', sportsRouter);
app.use('/sports', sportsRouter);

app.use(['/:lang/*', /en|de|zh/], (req, res, next) => { console.log(req.lang); next(); }, sportsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.locals.betvictor = betvictor;

module.exports = app;
