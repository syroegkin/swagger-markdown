'use strict';

var Schema = require('../models/schema');
var transformDataTypes = require('./dataTypes');

/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 */
module.exports = function (responses) {
  var res = [];
  var schemas = false;
  Object.keys(responses).map(function (response) {
    var line = [];
    // Response
    line.push(response);

    // $ref
    var reference;
    if ('$ref' in responses[response]) {
      reference = responses[response].$ref.replace("#/responses/", "");
    }

    // Description
    if (responses[response].description != undefined) {
      var description = responses[response].description.replace(/[\r\n]/g, ' ');
      line.push(description);
    }
    else if (reference != undefined) {
      line.push(reference);
    } else {
      var description = '';
      line.push(description);
    }

    // Schema
    if ('schema' in responses[response]) {
      var schema = new Schema(responses[response].schema);
      line.push(transformDataTypes(schema));
      schemas = true;
    } else if (reference != undefined) {
      var schema = new Schema(responses[response]);
      line.push(transformDataTypes(schema));
      schemas = true;
    }

    // Combine all together
    res.push('|' + line.map(function (el) {
      return ' ' + el + ' ';
    }).join('|') + '|');
  });

  res.unshift('| ---- | ----------- |' + (schemas ? ' ------ |' : ''));
  res.unshift('| Code | Description |' + (schemas ? ' Schema |' : ''));
  res.unshift('**Responses**\n');

  return res.join('\n');
};
