#!/usr/bin/env node
const http = require('http');
const url = require('url');
const path = require('path');

const opts = {
  port: 3000,
  host: 'localhost'
};

const app = require('./lib/express-server');
const appStartedAsCli = process.argv[1].includes('server.js');

const server = http.createServer(app);

app.start = (options) => {
  Object.assign(opts, options);
  return server.listen(opts, () => {
    if(appStartedAsCli) {
      console.log(`Server started at http://${opts.host}:${opts.port}/`)
    }
  });
};

app.stop = () => {
  server.close();
}

// Command line
if(appStartedAsCli) {
  opts.port = opts.port;
  app.start(opts);
}


module.exports = app;
