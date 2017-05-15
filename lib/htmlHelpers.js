
exports.wrapInHtml = function (data) {
  return wrapIn('html', data);
};

exports.wrapInHead = function (data) {
  return wrapIn('head', data);
};

exports.wrapInBody = function (data) {
  return wrapIn('body', data);
};

exports.wrapInTitle = function (data) {
  return wrapIn('h1', data);
};

exports.wrapInSubtitle = function (data, classnames) {
  return wrapIn('h4', data, classnames);
};

exports.wrapInSubtitleTitle = function (data, classnames) {
  return wrapIn('h5', data, classnames);
};

exports.wrapInContainer = function (data) {
  return exports.wrapInDiv(data, 'container');
};

exports.wrapInJumbotron = function (data) {
  return exports.wrapInDiv(exports.wrapInTitle(data), 'jumbotron');
};

exports.wrapInList = function (list) {
  return wrapIn('ul', list.reduce(function (acum, elem) {
    return acum + wrapIn('li', elem);
  }, ''));
};

exports.wrapInLink = function (data, link, props) {
  return '<a ' + props + ' href="' + link + '">' + data[0].toUpperCase() + data.substring(1) + '</a>';
};

exports.wrapInHeadLink = function (rel, href) {
  return '<link rel="' + rel + '" href="' + href + '" />';
};

exports.wrapInScript = function (src) {
  return '<script src="' + src + '"></script>';
};

exports.wrapInPre = function (data) {
  return wrapIn('pre', JSON.stringify(data, null, 2));
};

exports.wrapInDiv = function (data, classnames) {
  return wrapIn('div', data, classnames);
};

exports.wrapInDivWithProps = function (data, props) {
  return '<div ' + (props || '') + '>' + data + '</div>';
};

exports.subtitlePreWrapper = function (subtitle, data) {
  return exports.wrapInSubtitleTitle(subtitle) + exports.wrapInPre(data);
};

function wrapIn (tag, data, classnames) {
  return '<' + tag + (classnames ? ' class="' + classnames + '"' : '') + '>' + data + '</' + tag + '>';
}
