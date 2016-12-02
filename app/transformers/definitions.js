const anchor = require('../lib/anchor');
const dataTypeTransformer = require('./dataTypes');
const inArray = require('../lib/inArray');

module.exports = (name, definition) => {
  const res = [];
  const required = 'required' in definition ? definition.required : [];
  const linkAnchor = anchor(name);

  // Add anchor with name
  res.push(`<a name="${linkAnchor}"></a>${name}  `);
  res.push('```');
  res.push('{');
  const member = [];
  Object.keys(definition.properties).map(propName => {
    const prop = definition.properties[propName];
    const type = dataTypeTransformer(prop.type, prop.format || null);
    member.push(`\t${propName}: ${type}${inArray(propName, required) ? '*' : ''}`);
  });
  res.push(member.join('\n'));
  res.push('}');
  res.push('```');

  return res.length ? res.join('\n') : null;
};
