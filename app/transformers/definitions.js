const anchor = require('../lib/anchor');

module.exports = (name, definition) => {
  const res = [];
  // const required = 'required' in definition ? definition.required : [];
  const linkAnchor = anchor(name);

  // Add anchor with name
  res.push(`<a name="${linkAnchor}"></a>`);
  console.log(definition);
  return res.length ? res.join('\n') : null;
};
