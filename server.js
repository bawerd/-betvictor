#!/usr/bin/env node
const http = require('http');
const url = require('url');
const path = require('path');

const opts = {
  port: 3000,
  host: 'localhost'
};

const app = require('./lib/express-server');

const server = http.createServer(app);

app.start = (options) => {
  Object.assign(opts, options);

  server.listen(opts);
};

app.stop = () => {
  server.close();
}

// Command line
if(process.argv[1].includes('server.js')) {
  opts.port = process.argv[2] || opts.port;
  app.start(opts);
}


module.exports = app;
