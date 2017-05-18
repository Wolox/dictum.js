
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
