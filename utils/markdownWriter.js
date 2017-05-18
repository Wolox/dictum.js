var fs = require('fs');

exports.generate = function (data) {
  var data = exports.generateData(data);
  if (data) {
    fs.writeFileSync('./docs/docs.md', data);
  }
};

exports.generateData = function (data) {
  var resources = data.resources;
  var data = [];

  if (resources) {
    var resourcesKeys = Object.keys(resources);

    resourcesKeys.forEach(function (resourceKey) {
      var endpoints = resources[resourceKey].endpoints;

      data.push(exports.resourceMarkdown(resourceKey));

      endpoints.forEach(function (endpoint) {
        data.push(exports.endpointMarkdown(endpoint.method, endpoint.endpoint));
        data.push(exports.endpointDescriptionMarkdown(endpoint.description));

        data.push(exports.dataTitleMarkdown('Request data'));
        data.push(exports.titleJsonMarkdown('Headers', endpoint.requestHeaders));
        data.push(exports.titleJsonMarkdown('Body', endpoint.requestBodyParams));

        data.push(exports.dataTitleMarkdown('Response data'));
        data.push(exports.dataSubtitleMarkdown('Status: ' + endpoint.responseStatus));
        data.push(exports.titleJsonMarkdown('Headers', endpoint.responseHeaders));
        data.push(exports.titleJsonMarkdown('Body', endpoint.responseBody));
      });
    });
  }

  return data.join('');
};

exports.resourceMarkdown = function (resource) {
  return resource ? '# ' + capitalize(resource) + '\n' : '';
}

exports.endpointMarkdown = function (method, endpoint) {
  return method && endpoint ? '## ' + method.toUpperCase() + ' ' + endpoint + '\n' : '';
}

exports.endpointDescriptionMarkdown = function (desc) {
  return desc ? desc + '\n' : '';
}

exports.dataTitleMarkdown = function (title) {
  return title ? '### ' + capitalize(title) + '\n' : '';
}

exports.dataSubtitleMarkdown = function (subtitle) {
  return subtitle ? '#### ' + capitalize(subtitle) + '\n' : '';
}

exports.jsonMarkdown = function (json) {
  return json ? '```json\n' + JSON.stringify(json, null, 2) + '\n```\n' : '';
}

exports.titleJsonMarkdown = function (title, json) {
  if (title && Object.keys(json || {}).length) {
    return exports.dataSubtitleMarkdown(title) + exports.jsonMarkdown(json);
  }
  return '';
}

function capitalize(text) {
  return text ? text[0].toUpperCase() + text.substring(1) : '';
}
