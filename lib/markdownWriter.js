var fs = require('fs');

exports.generate = function (data) {
  var resources = data.resources;
  if (resources) {
    var resourcesKeys = Object.keys(resources);
    var data = [];

    resourcesKeys.forEach(function (resourceKey) {
      var endpoints = resources[resourceKey].endpoints;

      data.push(resourceMarkdown(resourceKey));

      endpoints.forEach(function (endpoint) {
        data.push(endpointMarkdown(endpoint.method, endpoint.endpoint));
        data.push(endpointDescriptionMarkdown(endpoint.description));

        data.push(dataTitleMarkdown('Request data'));
        data.push(titleJsonMarkdown('Headers', endpoint.requestHeaders));
        data.push(titleJsonMarkdown('Body', endpoint.requestBodyParams));

        data.push(dataTitleMarkdown('Response data'));
        data.push(dataSubtitleMarkdown('Status: ' + endpoint.responseStatus));
        data.push(titleJsonMarkdown('Headers', endpoint.responseHeaders));
        data.push(titleJsonMarkdown('Body', endpoint.responseBody));
      });
    });

    fs.writeFileSync('./docs/docs.md', data.join(''));
  }
};

function resourceMarkdown (resource) {
  return '# ' + resource[0].toUpperCase() + resource.substring(1) + '\n';
}

function endpointMarkdown (method, endpoint) {
  if (method && endpoint) {
    return '## ' + method + ' ' + endpoint + '\n';
  }
  return '';
}

function endpointDescriptionMarkdown (desc) {
  if (desc) {
    return desc + '\n';
  }
  return '';
}

function dataTitleMarkdown (title) {
  return '### ' + title + '\n';
}

function dataSubtitleMarkdown (title) {
  return '#### ' + title + '\n';
}

function jsonMarkdown (json) {
  return '```json\n' + JSON.stringify(json, null, 2) + '\n```\n';
}

function titleJsonMarkdown (title, json) {
  if (title && Object.keys(json || {}).length) {
    return dataSubtitleMarkdown(title) + jsonMarkdown(json);
  }
  return '';
}
