var fs = require('fs'),
  rimraf = require('rimraf'),
  htmlWriter = require('./utils/htmlWriter'),
  markdownWriter = require('./utils/markdownWriter');

var documenter = {
  errors: [],
  formatter: 'html',
  path: './docs',
  resources: {}
};

var formatters = {
  markdown: markdownWriter,
  html: htmlWriter
};

function getFormatter () {
  return formatters[documenter.formatter];
}

exports.setFormatter = function (formatter) {
  if (!formatters[formatter.toLowerCase()]) {
    return false;
  }
  documenter.formatter = formatter.toLowerCase();
  return documenter.formatter;
};

exports.document = function (data) {
  var endpoint = data.endpoint,
    resource = data.resource.split('?')[0];

  if (resource && endpoint) {
    documenter.resources[resource] = documenter.resources[resource] || {};
    documenter.resources[resource].endpoints = (documenter.resources[resource].endpoints || []).concat({
      description: data.description,
      endpoint: endpoint,
      method: data.method,
      requestHeaders: data.requestHeaders,
      requestPathParams: data.requestPathParams,
      requestBodyParams: data.requestBodyParams,
      responseStatus: data.responseStatus,
      responseHeaders: data.responseHeaders,
      responseBody: data.responseBody
    });

    rimraf.sync(documenter.path);
    fs.mkdirSync(documenter.path);
    getFormatter().generate(documenter);
  }
}

exports.chai = function (res, description) {
  var resource = res.req.path.split('/')[1];

  var reqHeaders = res.req._headers;
  delete reqHeaders.host;
  delete reqHeaders['accept-encoding'];
  delete reqHeaders['user-agent'];

  var reqBody = res.request.toJSON().data;

  var resHeaders = res.headers;
  delete resHeaders['x-powered-by'];

  exports.document({
    description: description,
    endpoint: res.req.path,
    method: res.req.method,
    requestHeaders: reqHeaders,
    requestPathParams: '',
    requestBodyParams: reqBody,
    responseStatus: res.status,
    responseHeaders: resHeaders,
    responseBody: res.body,
    resource: resource
  });
};
