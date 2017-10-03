'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var transformContact = require('./contact');
var transformLicense = require('./license');

/**
 * http://swagger.io/specification/#infoObject
 * Prepare page header
 * Leave description with no changes
 * @param {Object} info
 * @returns {String}
 */
module.exports = function (info) {
  var res = [];
  if (info !== null && (typeof info === 'undefined' ? 'undefined' : _typeof(info)) === 'object') {
    if ('title' in info) {
      res.push(info.title + '\n' + Array(info.title.length + 1).join('='));
    }

    if ('description' in info) {
      res.push(info.description + '\n');
    }

    if ('version' in info) {
      res.push('**Version:** ' + info.version + '\n');
    }

    if ('termsOfService' in info) {
      res.push('**Terms of service:**  \n' + info.termsOfService + '\n');
    }

    if ('contact' in info) {
      res.push(transformContact(info.contact));
    }

    if ('license' in info) {
      res.push(transformLicense(info.license));
    }
  }
  return res.length ? res.join('\n') : null;
};