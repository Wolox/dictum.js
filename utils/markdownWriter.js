var fs = require('fs'),
  markdownHelpers = require('./markdownHelpers');

exports.generate = function (data) {
  var resources = data.resources;

  if (resources) {
    var resourcesKeys = Object.keys(resources);
    var data = [];

    resourcesKeys.forEach(function (resourceKey) {
      var endpoints = resources[resourceKey].endpoints;

      data.push(markdownHelpers.resourceMarkdown(resourceKey));

      endpoints.forEach(function (endpoint) {
        data.push(markdownHelpers.endpointMarkdown(endpoint.method, endpoint.endpoint));
        data.push(markdownHelpers.endpointDescriptionMarkdown(endpoint.description));

        data.push(markdownHelpers.dataTitleMarkdown('Request data'));
        data.push(markdownHelpers.titleJsonMarkdown('Headers', endpoint.requestHeaders));
        data.push(markdownHelpers.titleJsonMarkdown('Body', endpoint.requestBodyParams));

        data.push(markdownHelpers.dataTitleMarkdown('Response data'));
        data.push(markdownHelpers.dataSubtitleMarkdown('Status: ' + endpoint.responseStatus));
        data.push(markdownHelpers.titleJsonMarkdown('Headers', endpoint.responseHeaders));
        data.push(markdownHelpers.titleJsonMarkdown('Body', endpoint.responseBody));
      });
    });

    fs.writeFileSync('./docs/docs.md', data.join(''));
  }
};
