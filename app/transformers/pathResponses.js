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
  Object.keys(responses).forEach(responseCode => {
    const line = [];
    const response = responses[responseCode];
    // Response
    line.push(responseCode);

    // Description
    let description = '';
    if ('description' in response) {
      description += response.description.replace(/[\r\n]/g, ' ');
    }
    if ('examples' in response) {
      description += Object.entries(response.examples).map(([contentType, example]) => {
        let formattedExample =
          typeof example === 'string' ? example : JSON.stringify(example, null, '  ');

        formattedExample = formattedExample.replace(/\r?\n/g, '<br>');

        return `<br><br>**Example** (*${contentType}*):<br><pre>${formattedExample}</pre>`;
      }).join('');
    }
    line.push(description);
    // Schema
    if ('schema' in response) {
      const schema = new Schema(response.schema);
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
