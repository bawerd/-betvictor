#!/usr/bin/env node
var opts = {
  port: 3000
}

var app = module.exports = (port) => {
  app.start(port);
}

app.start = async (port) => {
  console.log(`Heeelo ${port}`);
};

// Command line
if(process.argv[1].includes('server.js')) {
  app(opts.port);
}
