const url = require('url');
const _ = require('lodash');

const Cache = {
  _cache: require('memory-cache'),
  put: async function(lang, data) {
    return await new Promise((resolve, reject) => {
      let keyedSports =  _.keyBy(data.sports, 'id');

      let sortedData = {
        indexed: {
          sports: keyedSports,
        },
        sports: _.sortBy(data.sports, 'pos')
      }

      this._cache.put(lang, sortedData);
      resolve(sortedData);
    });
  },
  get: function(lang) {
    return this._cache.get(lang);
  }
}

const transport = {
    'http:': require('http'),
    'https:': require('https')
}

const getData = async (lang = 'en', key) => {
  let data = Cache.get(lang);

  if(!data) {
    return await new Promise((resolve, reject) => {
      makeBetvictorRequest(lang).then((allData) => {
        Cache.put(lang, allData).then(() => {
          return resolve(Cache.get(lang));
        });
      });
    });
  } else {
    if(key) {
      return data[key]
    } else {
      return data;
    }
  }

}

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
        res.on('end', () => {
          let responseData = JSON.parse(data);
          responseData.language = lang;
          resolve(responseData);
        });
        res.on('error', (e) => { reject(e); });
     }
   });

   req.on('error', (e) => {
     console.error(`Unhandled error in http request: ${e.message}`);
   });

 }).catch((status) => {
   if(status.statusCode == 301) {
     return makeBetvictorRequest(lang, status.data);
   } else {
     console.error("ERROR", status);
   }
 });

};

const betvictor = module.exports;

betvictor.getSports = async (lang = 'en') => {
  return await getData(lang).then(d => d.sports);
};

betvictor.getSport = async (lang = 'en', sportId) => {
  return await getData(lang).then(d => d.indexed.sports[sportId]);
};

betvictor.getEvents = async (lang = 'en', sportId) => {
  return await getData(lang).then( (d) => {
    return _.sortBy(d.indexed.sports[sportId].events, 'pos')
  });
};

betvictor.getEvent = async (lang = 'en', sportId, eventId) => {
  return await getData(lang).then( (d) => {
    return _.find(d.indexed.sports[sportId].events, { event_id: parseInt(eventId) });
  });
};


module.exports = betvictor;
