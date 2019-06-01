const Schema = require('../models/schema');
const transformDataTypes = require('./dataTypes');

/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 */
module.exports = responses => {
  const res = [];
  // Check if schema somewhere
  const schemas = Object.keys(responses).reduce(
    (acc, response) => acc || 'schema' in responses[response],
    false
  );
  Object.keys(responses).forEach(response => {
    const line = [];
    // Response
    line.push(response);

    // Description
    if ('description' in responses[response]) {
      const description = responses[response].description.replace(/[\r\n]/g, ' ');
      line.push(description);
    } else {
      line.push('');
    }
    // Schema
    if ('schema' in responses[response]) {
      const schema = new Schema(responses[response].schema);
      line.push(transformDataTypes(schema));
    } else if (schemas) {
      line.push('');
    }
    // Combine all together
    res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
  });
  res.unshift(`| ---- | ----------- |${schemas ? ' ------ |' : ''}`);
  res.unshift(`| Code | Description |${schemas ? ' Schema |' : ''}`);
  res.unshift('##### Responses\n');

  return res.join('\n');
};
