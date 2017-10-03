'use strict';

var transformDataTypes = require('./dataTypes');
var Schema = require('../models/schema');

module.exports = function (parameters, pathParameters) {
  var globalParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var res = [];
  res.push('**Parameters**\n');
  res.push('| Name | Located in | Description | Required | Schema |');
  res.push('| ---- | ---------- | ----------- | -------- | ---- |');
  [].concat(pathParameters, parameters).map(function (keys) {
    if (keys) {
      var paramsetersKeys = keys;
      // Check it for the reference
      if ('$ref' in keys) {
        var ref = keys.$ref.replace(/^#\/parameters\//, '');
        if (ref in globalParameters) {
          paramsetersKeys = globalParameters[ref];
        }
      }
      var line = [];
      // Name first
      line.push(paramsetersKeys.name || '');
      // Scope (in)
      line.push(paramsetersKeys.in || '');
      // description
      if ('description' in paramsetersKeys) {
        line.push(paramsetersKeys.description.replace(/[\r\n]/g, ' '));
      } else {
        line.push('');
      }
      line.push(paramsetersKeys.required ? 'Yes' : 'No');

      // Prepare schema to be transformed
      var schema = null;
      if ('schema' in paramsetersKeys) {
        schema = new Schema(paramsetersKeys.schema);
      } else {
        schema = new Schema();
        schema.setType('type' in paramsetersKeys ? paramsetersKeys.type : null);
        schema.setFormat('format' in paramsetersKeys ? paramsetersKeys.format : null);
        schema.setReference('$ref' in paramsetersKeys ? paramsetersKeys.$ref : null);
        schema.setItems('items' in paramsetersKeys ? paramsetersKeys.items : null);
      }

      line.push(transformDataTypes(schema));
      // Add spaces and glue with pipeline
      res.push('|' + line.map(function (el) {
        return ' ' + el + ' ';
      }).join('|') + '|');
    }
  });
  return res.join('\n');
};