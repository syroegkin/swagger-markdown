const transformDataTypes = require('./dataTypes');
const Schema = require('../models/schema');

module.exports = (parameters, pathParameters, globalParameters = {}) => {
  const res = [];
  res.push('##### Parameters\n');
  res.push('| Name | Located in | Description | Required | Schema |');
  res.push('| ---- | ---------- | ----------- | -------- | ---- |');
  [].concat(pathParameters, parameters).map(keys => {
    if (keys) {
      let parametersKeys = keys;
      // Check it for the reference
      if ('$ref' in keys) {
        const ref = (keys.$ref).replace(/^#\/parameters\//, '');
        if (ref in globalParameters) {
          parametersKeys = globalParameters[ref];
        }
      }
      const line = [];
      // Name first
      line.push(parametersKeys.name || '');
      // Scope (in)
      line.push(parametersKeys.in || '');
      // description
      if ('description' in parametersKeys) {
        line.push(parametersKeys.description.replace(/[\r\n]/g, ' '));
      } else {
        line.push('');
      }
      line.push(parametersKeys.required ? 'Yes' : 'No');

      // Prepare schema to be transformed
      let schema = null;
      if ('schema' in parametersKeys) {
        schema = new Schema(parametersKeys.schema);
      } else {
        schema = new Schema();
        schema.setType('type' in parametersKeys ? parametersKeys.type : null);
        schema.setFormat('format' in parametersKeys ? parametersKeys.format : null);
        schema.setReference('$ref' in parametersKeys ? parametersKeys.$ref : null);
        schema.setItems('items' in parametersKeys ? parametersKeys.items : null);
      }

      line.push(transformDataTypes(schema));
      // Add spaces and glue with pipeline
      res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
    }
  });
  return res.join('\n');
};
