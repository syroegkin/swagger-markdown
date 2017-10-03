'use strict';

/**
 * Make camel case format
*/
module.exports = function (input) {
  return input.replace(/[^\b\w\s]/ig, '').replace(/^\s*/ig, '').replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
};