var fs = require('fs'),
  chai = require('chai'),
  expect = chai.expect,
  htmlHelpers = require('./../utils/htmlHelpers');

describe('htmlHelpers', function () {
  describe('.wrapInHtml', function () {
    it('should return the correct html tag', function () {
      expect(htmlHelpers.wrapInHtml('some data')).to.be.equal('<html>some data</html>');
    });
  });

  describe('.wrapInHead', function () {
    it('should return the correct head tag', function () {
      expect(htmlHelpers.wrapInHead('some data')).to.be.equal('<head>some data</head>');
    });
  });

  describe('.wrapInBody', function () {
    it('should return the correct body tag', function () {
      expect(htmlHelpers.wrapInBody('some data')).to.be.equal('<body>some data</body>');
    });
  });

  describe('.wrapInTitle', function () {
    it('should return the correct h1 tag', function () {
      expect(htmlHelpers.wrapInTitle('some data')).to.be.equal('<h1>some data</h1>');
    });
  });

  describe('.wrapInSubtitle', function () {
    it('should return the correct h4 tag', function () {
      expect(htmlHelpers.wrapInSubtitle('some data', 'my-class')).to.be.equal('<h4 class="my-class">some data</h4>');
    });
  });

  describe('.wrapInSubtitleTitle', function () {
    it('should return the correct h5 tag', function () {
      expect(htmlHelpers.wrapInSubtitleTitle('some data', 'my-class')).to.be.equal('<h5 class="my-class">some data</h5>');
    });
  });

  describe('.wrapInContainer', function () {
    it('should return the correct div tag', function () {
      expect(htmlHelpers.wrapInContainer('some data')).to.be.equal('<div class="container">some data</div>');
    });
  });

  describe('.wrapInJumbotron', function () {
    it('should return the correct div tag', function () {
      expect(htmlHelpers.wrapInJumbotron('some data')).to.be.equal('<div class="jumbotron"><h1>some data</h1></div>');
    });
  });

  describe('.wrapInList', function () {
    it('should return the correct ul and li tags', function () {
      expect(htmlHelpers.wrapInList(['elem1', 'elem2'])).to.be.equal('<ul><li>elem1</li><li>elem2</li></ul>');
    });
  });

  describe('.wrapInLink', function () {
    it('should return the correct a tag', function () {
      expect(htmlHelpers.wrapInLink('some data', 'link', 'prop="value"')).to.be.equal('<a prop="value" href="link">Some data</a>');
    });
  });

  describe('.wrapInHeadLink', function () {
    it('should return the correct link header tag', function () {
      expect(htmlHelpers.wrapInHeadLink('my-rel', 'my-href')).to.be.equal('<link rel="my-rel" href="my-href" />');
    });
  });

  describe('.wrapInScript', function () {
    it('should return the correct script tag', function () {
      expect(htmlHelpers.wrapInScript('my-src')).to.be.equal('<script src="my-src"></script>');
    });
  });

  describe('.wrapInPre', function () {
    it('should return the correct pre tag', function () {
      var obj = { niceFormat: true };
      expect(htmlHelpers.wrapInPre(obj)).to.be.equal('<pre>' + JSON.stringify(obj, null, 2) + '</pre>');
    });
  });

  describe('.wrapInDiv', function () {
    it('should return the correct div tag', function () {
      expect(htmlHelpers.wrapInDiv('some data', 'my-class')).to.be.equal('<div class="my-class">some data</div>');
    });
  });

  describe('.wrapInDivWithProps', function () {
    it('should return the correct div tag', function () {
      expect(htmlHelpers.wrapInDivWithProps('some data', 'prop="value" data="data"')).to.be.equal('<div prop="value" data="data">some data</div>');
    });
  });

  describe('.subtitlePreWrapper', function () {
    it('should return the correct h4 and pre tags', function () {
      var obj = { niceFormat: true };
      expect(htmlHelpers.subtitlePreWrapper('subtitle', obj)).to.be.equal(htmlHelpers.wrapInSubtitleTitle('subtitle') + htmlHelpers.wrapInPre(obj));
    });
  });
});
