const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const server = require('../server');

describe('Interview Task - Software Engineer-NodeJs', function() {
  before(function() {
    server();
  });

  it('should list all sports', function(done) {
    done();
  });

  it('should list all events for a given sport', function(done) {
    done();
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
