const transformDataTypes = require('./dataTypes');
const Schema = require('../models/schema');

module.exports = (parameters, pathParameters, globalParameters = {}) => {
  const res = [];
  res.push('**Parameters**\n');
  res.push('| Name | Located in | Description | Required | Schema |');
  res.push('| ---- | ---------- | ----------- | -------- | ---- |');
  [].concat(pathParameters, parameters).map(keys => {
    if (keys) {
      let paramsetersKeys = keys;
      // Check it for the reference
      if ('$ref' in keys) {
        const ref = (keys.$ref).replace(/^#\/parameters\//, '');
        if (ref in globalParameters) {
          paramsetersKeys = globalParameters[ref];
        }
      }
      const line = [];
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
      let schema = null;
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
      res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
    }
  });
  return res.join('\n');
};
