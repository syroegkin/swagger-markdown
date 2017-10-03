'use strict';

var DEFAULT_TEXT = 'Find more info here';

module.exports = function (externalDocs) {
  var res = [];
  if ('description' in externalDocs && 'url' in externalDocs) {
    res.push('[' + externalDocs.description + '](' + externalDocs.url + ')');
  } else if ('url' in externalDocs) {
    res.push('[' + DEFAULT_TEXT + '](' + externalDocs.url + ')');
  }
  return res.length ? res.join('\n') : null;
};