const url = require('url');
const cache = require('memory-cache');

const transport = {
    'http:': require('http'),
    'https:': require('https')
}

const betvictor = module.exports;


const makeBetvictorRequest = async (lang = 'en', opts) => {
  opts = opts || {
    hostname: 'www.betvictor.com',
    path: `/live/${lang}/live/list.json`
  };

  return await new Promise((resolve, reject) => {

    const req = transport[opts.protocol || 'http:'].get(opts, (res) => {
      if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
        if(res.statusCode == 301) {
          reject({ statusCode: res.statusCode, data: url.parse(res.headers.location) });
        } else {
          reject({ statusCode: res.statusCode, data: res })
        }
      } else {
        res.setEncoding('utf8');

        let data = '';
        res.on('data', (chunk) => { data = data + chunk; });
        res.on('end', () => { resolve(JSON.parse(data)); });
        res.on('error', (e) => { reject(e); });
     }
   });

   req.on('error', (e) => {
     console.log(`Unhandled error in http request: ${e.message}`);
   });

 }).catch((status) => {
   if(status.statusCode == 301) {
     return makeBetvictorRequest(lang, status.data);
   } else {
     console.error("ERROR", status);
   }
 });

};

betvictor.getSports = async () => {
  return await makeBetvictorRequest();
};

module.exports = betvictor;
