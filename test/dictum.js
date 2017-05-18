var fs = require('fs'),
  chai = require('chai'),
  spies = require('chai-spies')
  expect = chai.expect,
  dictum = require('./../index');

chai.use(spies);

var docsPath = './docs';
var resourceOne = { endpoint: '/resourceOne/one', method: 'GET', resource: 'resourceOne' };
var resourceTwo = { endpoint: '/resourceTwo/one', method: 'GET', resource: 'resourceTwo' };

var chaiResponse = {
  req: {
    method: 'GET',
    path: '/resource/some',
    _headers: {}
  },
  request: {
    toJSON: function () { return { data: {} } }
  },
  headers: {}
};

function resourcePath (resource) {
  return docsPath + '/' + resource;
}

function resourceHtmlPath (resource) {
  return resourcePath(resource) + '.html';
}

function resourceMarkdownPath (resource) {
  return resourcePath(resource) + '.md';
}

describe('dictum', function () {
  describe('.document', function () {
    describe('when using default [html] formatter', function () {
      it('should generate \'.html\' documentation', function (done) {
        dictum.document(resourceOne);
        dictum.document(resourceTwo);
        expect(fs.existsSync(resourceHtmlPath(resourceOne.resource))).to.be.true;
        expect(fs.existsSync(resourceHtmlPath(resourceTwo.resource))).to.be.true;
        expect(fs.existsSync(resourceHtmlPath('index'))).to.be.true;
        done();
      });
    });

    describe('when using markdown formatter', function () {
      it('should generate \'.md\' documentation', function (done) {
        dictum.setFormatter('markdown');
        dictum.document(resourceOne);
        dictum.document(resourceTwo);
        expect(fs.existsSync(resourceMarkdownPath('docs'))).to.be.true;
        done();
      });
    });

    describe('when setting an invalid formatter', function () {
      it('should return false', function (done) {
        expect(dictum.setFormatter('invalid-formatter')).to.be.false;
        done();
      });
    });
  });

  describe('.chai', function () {
    var documentSpy = chai.spy.on(dictum, 'document');

    it('should call \'.document\'', function (done) {
      expect(documentSpy).to.have.been.called();
      dictum.chai(chaiResponse);
      done();
    });
  });
});
