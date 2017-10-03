'use strict';

var inArray = require('../lib/inArray');
var transformResponses = require('./pathResponses');
var transformParameters = require('./pathParameters');
var security = require('./security');

/**
 * Allowed methods
 * @type {string[]}
 */
var ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

module.exports = function (path, data, parameters) {
  var res = [];
  var pathParameters = null;

  if (path && data) {
    // Make path as a header
    res.push('### ' + path);
    res.push('---');

    // Check if parameter for path are in the place
    if ('parameters' in data) {
      pathParameters = data.parameters;
    }

    // Go further method by methods
    Object.keys(data).map(function (method) {
      if (inArray(method, ALLOWED_METHODS)) {
        // Set method as a subheader
        res.push('##### ***' + method.toUpperCase() + '***');
        var pathInfo = data[method];

        // Set summary
        if ('summary' in pathInfo) {
          res.push('**Summary:** ' + pathInfo.summary + '\n');
        }

        // Set description
        if ('description' in pathInfo) {
          res.push('**Description:** ' + pathInfo.description + '\n');
        }

        // Build parameters
        if ('parameters' in pathInfo || pathParameters) {
          res.push(transformParameters(pathInfo.parameters, pathParameters, parameters) + '\n');
        }

        // Build responses
        if ('responses' in pathInfo) {
          res.push(transformResponses(pathInfo.responses) + '\n');
        }

        // Build security
        if ('security' in pathInfo) {
          res.push(security(pathInfo.security) + '\n');
        }
      }
    });
  }
  return res.length ? res.join('\n') : null;
};