var markdownWriter = require('./../utils/markdownWriter');

describe('markdownWriter', function () {
  describe('.some titleMarkdown', function () {
    it('should return the correct # markdown', function () {
      expect(markdownWriter.resourceMarkdown('resource')).to.be.equal('# Resource\n');
    });

    it('should return an empty string markdown when providing no data', function () {
      expect(markdownWriter.resourceMarkdown()).to.be.equal('');
    });
  });

  describe('.endpointMarkdown', function () {
    it('should return the correct ## markdown when providing method and endpoint', function () {
      expect(markdownWriter.endpointMarkdown('get', '/books')).to.be.equal('## GET /books\n');
    });

    it('should return an empty string when providing only method', function () {
      expect(markdownWriter.endpointMarkdown('get')).to.be.equal('');
    });

    it('should return an empty string markdown when providing only endpoint', function () {
      expect(markdownWriter.endpointMarkdown(null, '/books')).to.be.equal('');
    });

    it('should return an empty string markdown when providing no data', function () {
      expect(markdownWriter.endpointMarkdown()).to.be.equal('');
    });
  });

  describe('.endpointDescriptionMarkdown', function () {
    it('should return the correct description with new line at the end', function () {
      expect(markdownWriter.endpointDescriptionMarkdown('some description')).to.be.equal('some description\n');
    });

    it('should return an empty string markdown when providing no data', function () {
      expect(markdownWriter.endpointDescriptionMarkdown()).to.be.equal('');
    });
  });

  describe('.dataTitleMarkdown', function () {
    it('should return the correct ### markdown', function () {
      expect(markdownWriter.dataTitleMarkdown('some title')).to.be.equal('### Some title\n');
    });

    it('should return an empty string markdown when providing no data', function () {
      expect(markdownWriter.dataTitleMarkdown()).to.be.equal('');
    });
  });

  describe('.dataSubtitleMarkdown', function () {
    it('should return the correct #### markdown', function () {
      expect(markdownWriter.dataSubtitleMarkdown('some subtitle')).to.be.equal('#### Some subtitle\n');
    });

    it('should return an empty string markdown when providing no data', function () {
      expect(markdownWriter.dataSubtitleMarkdown()).to.be.equal('');
    });
  });

  describe('.jsonMarkdown', function () {
    it('should return the correct formatted json markdown', function () {
      var obj = { key: 'value'};
      expect(markdownWriter.jsonMarkdown(obj)).to.be.equal('```json\n' + JSON.stringify(obj, null, 2) + '\n```\n');
    });

    it('should return an empty string markdown when providing no data', function () {
      expect(markdownWriter.jsonMarkdown()).to.be.equal('');
    });
  });

  describe('.titleJsonMarkdown', function () {
    it('should return the correct ### markdown with the correct formatted json when title and object provided', function () {
      var obj = { key: 'value'};
      expect(markdownWriter.titleJsonMarkdown('some title', obj)).to.be.equal(
        '#### Some title\n' + '```json\n' + JSON.stringify(obj, null, 2) + '\n```\n'
      );
    });

    it('should return an empty string when only providing title', function () {
      expect(markdownWriter.titleJsonMarkdown('some title')).to.be.equal('');
    });

    it('should return an empty string when only providing an object', function () {
      expect(markdownWriter.titleJsonMarkdown(null, { key: 'some value' })).to.be.equal('');
    });

    it('should return empty an string markdown when providing no data', function () {
      expect(markdownWriter.titleJsonMarkdown('some title')).to.be.equal('');
    });
  });
});
