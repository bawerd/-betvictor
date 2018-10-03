const express = require('express');
const app = express();
const sportsRouter = require('./routes/sports');
const betvictor = require('../betvictor');


/* default language en */
app.use((req, res, next) => {
  req.lang = 'en';
  next();
});

app.param('lang', (req, res, next, lang) => {
  req.lang = lang;
  next();
});

app.use('/:lang(en|de|zh)', sportsRouter);
app.use('/', sportsRouter);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.locals.betvictor = betvictor;

module.exports = app;
