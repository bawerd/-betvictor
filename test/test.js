const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require('supertest');
const betvictor = require('../lib/betvictor');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiAsPromised);


const app = require('../server');

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
        console.log("GOT DATA", data);
        done();
      });
    });
  });

  describe('API endpoints', function() {
    it('should list all sports', function(done) {

      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, {}, done);

    });

    it('should list all events for a given sport');
    it('should list all data for a given event');
    it('should list all sports in all languages');
    it('should have language support (English, German and Chinese) * Caching');
    it('should have full test coverage');
  });


})
