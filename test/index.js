var fs = require('fs'),
  path = require('path')
  chai = require('chai'),
  spies = require('chai-spies')
  rimraf = require('rimraf');

chai.use(spies);

var docsPath = './docs';

beforeEach(function (done) {
  rimraf(docsPath, function () {
    done();
  });
});

// include all test files
var normalizedPath = path.join(__dirname, '.');
fs.readdirSync(normalizedPath).forEach(function (file) {
  require('./' + file);
});
