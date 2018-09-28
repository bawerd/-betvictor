const express = require('express');
const app = express();
const indexRouter = require('./routes');

app.use('/', indexRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
