const express = require('express');
const app = express();
const sportsRouter = require('./routes/sports');
const betvictor = require('../betvictor');

app.use('/', sportsRouter);
app.use('/sports', sportsRouter);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.locals.betvictor = betvictor;

module.exports = app;
