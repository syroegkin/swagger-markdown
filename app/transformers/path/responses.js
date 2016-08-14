/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 * @todo: implement schemas, items, refs
 */
module.exports = responses => {
  const res = [];
  res.push('**Responses**');
  res.push('| Code | Description |');
  res.push('| ---- | ----------- |');
  Object.keys(responses).map(response => {
    res.push(`| ${response} | ${responses[response].description || ''} |`);
  });
  return res.join('\n');
};
