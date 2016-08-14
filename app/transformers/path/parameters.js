module.exports = parameters => {
  const res = [];
  res.push(`**Parameters**\n`);
  res.push('| Name | Located in | Description | Required | Type |');
  res.push('| ---- | ---------- | ----------- | -------- | ---- |');
  parameters.map(keys => {
    res.push(
      `| ${keys.name} | ${keys.in} | ${keys.description} | ` +
      `${keys.required ? 'Yes' : 'No'} | ${keys.type} |`
    );
  });
  return res.join('\n');
};
