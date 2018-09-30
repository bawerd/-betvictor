const url = require('url');
const cache = require('memory-cache');

const transport = {
    'http:': require('http'),
    'https:': require('https')
}

const betvictor = Object.create({}); // async () => { return await makeBetvictorRequest(); }

const makeBetvictorRequest = async (opts = 'http://www.betvictor.com/live/en/live/list.json' ) => {
  return await new Promise((resolve, reject) => {
    transport[opts.protocol || 'http:'].get(opts, (res) => {
      if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
        reject(url.parse(res.headers.location));
      } else {
        res.setEncoding('utf8');

        let data = '';
        res.on('data', (chunk) => { data = data + chunk; });
        res.on('end', () => { resolve(JSON.parse(data)); });
        res.on('error', (e) => { reject(e); });
     }
   });

 }).catch((newLocation) => {
   if(newLocation.hostname) {
     return makeBetvictorRequest(newLocation);
   } else {
     console.error("ERROR", newLocation);
   }
 });

};

betvictor.getSports = async () => {
  return await makeBetvictorRequest();
};

module.exports = betvictor;
