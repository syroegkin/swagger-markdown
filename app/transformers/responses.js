const Schema = require('../models/schema');
const transformDataTypes = require('./dataTypes');

/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 * @todo: implement schemas, items, refs
 */
module.exports = responses => {
  const res = [];
  res.push('**Responses**\n');
  res.push('| Code | Description | Schema |');
  res.push('| ---- | ----------- | ------ |');
  Object.keys(responses).map(response => {
    const line = [];
    // Response
    line.push(response);
    // Description
    const description =
      responses[response].description.replace(/[\r\n]/g, ' ');
    line.push(description);
    // Schema
    if ('schema' in responses[response]) {
      const schema = new Schema(responses[response].schema);
      line.push(transformDataTypes(schema));
    } else {
      line.push('');
    }
    // Combine all together
    res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
  });
  return res.join('\n');
};
