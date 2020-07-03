const transformDataTypes = require('./dataTypes');
const Schema = require('../models/schema');

module.exports = (parameters, pathParameters) => {
  const res = [];
  res.push('##### Parameters\n');
  res.push('| Name | Located in | Description | Required | Schema |');
  res.push('| ---- | ---------- | ----------- | -------- | ---- |');
  [].concat(pathParameters, parameters).map(keys => {
    if (keys) {
      const line = [];
      // Name first
      line.push(keys.name || '');
      // Scope (in)
      line.push(keys.in || '');
      // description
      if ('description' in keys) {
        line.push(keys.description.replace(/[\r\n]/g, ' '));
      } else {
        line.push('');
      }
      line.push(keys.required ? 'Yes' : 'No');

      // Prepare schema to be transformed
      let schema = null;
      if ('schema' in keys) {
        schema = new Schema(keys.schema);
      } else {
        schema = new Schema();
        schema.setType('type' in keys ? keys.type : null);
        schema.setFormat('format' in keys ? keys.format : null);
        schema.setReference('$ref' in keys ? keys.$ref : null);
        schema.setItems('items' in keys ? keys.items : null);
      }

      line.push(transformDataTypes(schema));
      // Add spaces and glue with pipeline
      res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
    }
  });
  return res.join('\n');
};
