const anchor = require('../lib/anchor');
const dataTypeTransformer = require('./dataTypes');
const inArray = require('../lib/inArray');
const Schema = require('../models/schema');

/**
 * @param {type} name
 * @param {type} definition
 * @return {type} Description
 */
const processDefinition = (name, definition) => {
  const res = [];
  const required = 'required' in definition ? definition.required : [];
  const linkAnchor = anchor(name);

  // Add anchor with name
  res.push(`<a name="${linkAnchor}"></a>**${name}**  `);
  res.push('');
  res.push('| Name | Type | Description | Required |');
  res.push('| ---- | ---- | ----------- | -------- |');
  Object.keys(definition.properties).map(propName => {
    const prop = definition.properties[propName];
    const typeCell = dataTypeTransformer(new Schema(prop));
    const descriptionCell = 'description' in prop ? prop.description : '';
    const requiredCell = inArray(propName, required) ? 'Yes' : 'No';
    res.push(`| ${propName} | ${typeCell} | ${descriptionCell} | ${requiredCell} |`);
  });

  return res.length ? res.join('\n') : null;
};
module.exports.processDefinition = processDefinition;


/**
 * @param {type} definitions
 * @return {type} Description
 */
module.exports = definitions => {
  const res = [];
  Object.keys(definitions).map(
    definitionName => res.push(
      processDefinition(definitionName, definitions[definitionName])
    )
  );
  if (res.length > 0) {
    res.unshift('---');
    res.unshift('### Models');
    return res.join('\n');
  }
  return null;
};
