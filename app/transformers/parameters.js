module.exports = (parameters, pathParameters) => {
  const res = [];
  res.push(`**Parameters**\n`);
  res.push('| Name | Located in | Description | Required | Type |');
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
      line.push(keys.type || '');
      // Add spaces and glue with pipeline
      res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
    }
  });
  return res.join('\n');
};
