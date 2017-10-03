'use strict';

module.exports = function (security) {
  var res = [];
  var maxLength = 0;
  security.map(function (rules) {
    Object.keys(rules).map(function (key) {
      maxLength = rules[key].length > maxLength ? rules[key].length : maxLength;
    });
  });
  maxLength++;
  if (maxLength < 2) maxLength = 2;

  security.map(function (rules) {
    Object.keys(rules).map(function (key) {
      var line = [key].concat(rules[key]);
      while (line.length < maxLength) {
        line.push('');
      }
      var lineReduced = line.reduce(function (prev, curr) {
        return prev + ' ' + (curr || '') + ' |';
      }, '|');
      lineReduced = lineReduced.replace(/\s{2,}/g, ' ');
      res.push(lineReduced);
    });
  });
  if (res.length) {
    var line = Array(maxLength).fill(' --- ');
    res.unshift('|' + line.join('|') + '|');
    line = [];
    line.push(' Security Schema ');
    line.push(' Scopes ');
    while (line.length < maxLength) {
      line.push(' ');
    }
    res.unshift('|' + line.join('|') + '|');
    res.unshift('**Security**\n');
    return res.join('\n');
  }
  return null;
};