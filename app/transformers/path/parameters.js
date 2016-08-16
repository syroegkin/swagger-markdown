module.exports = (parameters, pathParameters) => {
  const res = [];
  res.push(`**Parameters**\n`);
  res.push('| Name | Located in | Description | Required | Type |');
  res.push('| ---- | ---------- | ----------- | -------- | ---- |');
  [].concat(pathParameters, parameters).map(keys => {
    if (keys) {
      res.push(
        `| ${keys.name} | ${keys.in} | ` +
        `${keys.description && keys.description.replace(/[\r\n]/g, ' ')} | ` +
        `${keys.required ? 'Yes' : 'No'} | ${keys.type} |`
      );
    }
  });
  return res.join('\n');
};
