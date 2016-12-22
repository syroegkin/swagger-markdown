const Schema = require('../models/schema');
const transformDataTypes = require('./dataTypes');

/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 */
module.exports = responses => {
  const res = [];
  let schemas = false;
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
      schemas = true;
    }
    // Combine all together
    res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
  });

  res.unshift(`| ---- | ----------- |${schemas ? ' ------ |' : ''}`);
  res.unshift(`| Code | Description |${schemas ? ' Schema |' : ''}`);
  res.unshift('**Responses**\n');

  return res.join('\n');
};
