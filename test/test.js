const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const request = require('supertest');
const should = chai.should();

chai.use(chaiAsPromised);


const app = require('../server');

describe('Interview Task - Software Engineer-NodeJs', function() {
  before(() => {
    app.start({port:8000});
  });

  after(() => {
    app.stop();
  });

  it('should list all sports', (done) => {

    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, {}, done);

  });

  it('should list all events for a given sport', function() {

  });
  it('should list all data for a given event', function(done) {
    done();
  });
  it('should list all sports in all languages', function(done) {
    done();
  });
  it('should have language support (English, German and Chinese) * Caching', function(done) {
    done();
  });
  it('should have full test coverage', function(done) {
    /* infinite recursion */
    //
    done();
  });
})
