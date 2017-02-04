const assert = require('assert');
const http = require('http');

/* global describe, it, before  */
describe('API Test Suite', () => {
  // Start server before testing!
  before(() => {
    // shell.exec('node ../server.js', { async: true });
  });

  describe('GET /', () => {
    it('should return 200 status', (done) => {
      http.get('http://localhost:5000', (response) => {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
});
