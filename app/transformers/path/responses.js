/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 * @todo: implement schemas, items, refs
 */
module.exports = responses => {
  const res = [];
  res.push(`**Responses**\n`);
  res.push('| Code | Description |');
  res.push('| ---- | ----------- |');
  Object.keys(responses).map(response => {
    res.push(`| ${response} | ${responses[response].description.replace(/[\r\n]/g, ' ') || ''} |`);
  });
  return res.join('\n');
};
