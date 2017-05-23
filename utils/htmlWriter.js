var fs = require('fs'),
 htmlHelpers = require('./htmlHelpers');

var BOOTSTRAP_CSS = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
var BOOTSTRAP_JS = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js';
var JQUERY = 'https://code.jquery.com/jquery-1.12.2.min.js';

exports.generate = function (data) {
  var resourcesKeys = Object.keys(data.resources);
  writeIndexHtml(resourcesKeys);
  resourcesKeys.forEach(function (resource) {
    writeResourceHtml(resource, data.resources[resource].endpoints);
  });
};

function writeIndexHtml (resources) {
  var html = (
    htmlHelpers.wrapInHtml(
      htmlHelpers.wrapInHead(
        htmlHelpers.wrapInHeadLink('stylesheet', BOOTSTRAP_CSS) +
        htmlHelpers.wrapInScript(JQUERY) +
        htmlHelpers.wrapInScript(BOOTSTRAP_JS) +
        '<style> pre { width: 95%; } </style>'
      ) +
      htmlHelpers.wrapInBody(
        htmlHelpers.wrapInContainer(
          htmlHelpers.wrapInJumbotron('Documentation') +
          htmlHelpers.wrapInTitle('Resources') +
          htmlHelpers.wrapInList(
            resources.map(
              function (resource) { return htmlHelpers.wrapInLink(resource, resource + '.html'); }
            )
          )
        )
      )
    )
  );
  fs.writeFileSync('./docs/index.html', html);
}

function writeResourceHtml (resource, endpoints) {
  var html = (
    htmlHelpers.wrapInHtml(
      htmlHelpers.wrapInHead(
        htmlHelpers.wrapInHeadLink('stylesheet', BOOTSTRAP_CSS) +
        htmlHelpers.wrapInScript(JQUERY) +
        htmlHelpers.wrapInScript(BOOTSTRAP_JS) +
        '<style> pre { width: 95%; } </style>'
      ) +
      htmlHelpers.wrapInBody(
        htmlHelpers.wrapInContainer(
          htmlHelpers.wrapInJumbotron(resource[0].toUpperCase() + resource.substring(1)) +
          endpoints.map(function (endpoint) {
            return writeEndpointHtml(endpoint);
          }).join('')
        )
      )
    )
  );
  fs.writeFileSync('./docs/' + resource + '.html', html);
}

function writeEndpointHtml (endpoint) {
  var cssEndpoint = endpoint.endpoint.split('/').map(function (elem) {
    return elem.split('?')[0];
  }).concat(endpoint.method).join('-');
  return htmlHelpers.wrapInDiv(
    htmlHelpers.wrapInDivWithProps(
      htmlHelpers.wrapInSubtitle(
        htmlHelpers.wrapInLink(
          endpoint.method + ' ' + endpoint.endpoint,
          '#collapse' + cssEndpoint,
          'role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapse' + cssEndpoint + '"'
        ),
        'panel-title'
      ),
      'class="panel-heading" role="tab" id="heading' + cssEndpoint + '"'
    ) +
    htmlHelpers.wrapInDivWithProps(
      htmlHelpers.wrapInDiv(
        htmlHelpers.wrapInSubtitle('Request Data') +
        htmlHelpers.wrapInDiv(
          htmlHelpers.subtitlePreWrapper('Headers', endpoint.requestHeaders) +
          (endpoint.requestBodyParams ? htmlHelpers.subtitlePreWrapper('Body', endpoint.requestBodyParams) : ''),
          'container'
        ),
        'panel-body'
      ) +
      htmlHelpers.wrapInDiv(
        htmlHelpers.wrapInSubtitle('Response Data') +
        htmlHelpers.wrapInDiv(
          htmlHelpers.wrapInSubtitleTitle('Status: ' + endpoint.responseStatus) +
          htmlHelpers.subtitlePreWrapper('Headers', endpoint.requestHeaders) +
          (endpoint.responseBody ? htmlHelpers.subtitlePreWrapper('Body', endpoint.responseBody) : ''),
          'container'
        ),
        'panel-body'
      ),
      'id="collapse' + cssEndpoint + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + cssEndpoint + '"'
    ),
    'panel panel-default'
  );
}
