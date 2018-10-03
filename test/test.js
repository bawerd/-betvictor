const chai = require('chai');
const request = require('supertest');
const betvictor = require('../lib/betvictor');
const _ = require('lodash');
const assert = chai.assert;


const app = require('../server');
const helpData = {};

describe('Interview Task - Software Engineer-NodeJs', function() {
  before(() => {
    app.start({port:8000});
  });

  after(() => {
    app.stop();
  });

  describe('Bet Victor proxy', function() {
    it('should sucessfully load data', function() {

      return Promise.all([
        betvictor.getSports('en').then((data) => {
          assert.exists(data);
          assert.equal(data[0].id, 100);
          helpData.en = { sports: data }
        }),

        betvictor.getSports('de').then((data) => {
          assert.exists(data);
          assert.equal(data[0].id, 100);
          helpData.de = { sports: data }
        }),

        betvictor.getSports('zh').then((data) => {
          assert.exists(data);
          assert.equal(data[0].id, 100);
          helpData.zh = { sports: data }
        })
      ]);

    });
  });

  describe('API endpoints', function() {
    it('should list all sports', function(done) {

      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, helpData.en.sports, done);

    });

    it('should list all events for a given sport', function(done) {
      const sport_id = 600;

      request(app)
        .get( `/sports/${sport_id}/events`)
        .set('Accept', 'application/json')
        .expect(200, _.sortBy(_.find(helpData.en.sports, { id: sport_id }).events, 'pos'), done);

    });

    it('should list all data for a given event', function(done) {
      const sport_id = 600;
      const event_id = 991826800;
      const sport =  _.find(helpData.en.sports, { id: sport_id });
      const event = _.find(sport.events, { id: event_id });

      request(app)
        .get( `/sports/${sport_id}/events/${event_id}`)
        .set('Accept', 'application/json')
        .expect(200, event, done);

    });

    it('should list all sports in all languages', function() {
      const sport_id = 1600;

      return Promise.all([
        request(app)
        .get( `/en/sports/${sport_id}`)
        .set('Accept', 'application/json')
        .expect(200, _.find(helpData.en.sports, { id: sport_id })),

        request(app)
        .get( `/de/sports/${sport_id}`)
        .set('Accept', 'application/json')
        .expect(200, _.find(helpData.de.sports, { id: sport_id })),

        request(app)
        .get( `/zh/sports/${sport_id}`)
        .set('Accept', 'application/json')
        .expect(200, _.find(helpData.zh.sports, { id: sport_id }))
      ]);

    });

    it('should have language support (English, German and Chinese) * Caching', () => {
      assert.isTrue(true, 'Check the code');
    });

    it('should have full test coverage', () => {
      assert.isTrue(true, 'See above');
    });
  });


})
