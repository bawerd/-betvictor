const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const request = require('supertest');
const betvictor = require('../lib/betvictor');
const assert = chai.assert;

chai.use(chaiAsPromised);

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
    it('should sucessfully load data', function(done) {
      betvictor.getSports().then((data) => {
        assert.exists(data);
        assert.equal(data[0].id, 100);
        helpData.en = { sports: data }

        done();
      });
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

      request(app)
        .get('/sports/600')
        .set('Accept', 'application/json')
        .expect(200, helpData.en.sports, done);

    });

    it('should list all data for a given event');
    it('should list all sports in all languages');
    it('should have language support (English, German and Chinese) * Caching');
    it('should have full test coverage');
  });


})
