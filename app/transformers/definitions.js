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
  res.push('');
  res.push(`<a name="${linkAnchor}"></a>**${name}**  `);
  res.push('');
  if (definition.description) {
    res.push(definition.description);
  }
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

  // Extend definitions that inherit a locally defined model
  Object.keys(definitions).forEach(k => {
    if (definitions[k].allOf) {
      definitions[k].allOf.some(obj => {
        if (obj.$ref) {
          // Assumes the reference is local (see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#reference-object)
          // TODO: check if external file is referenced + fetch + apply
          var ref = obj.$ref.replace('#/definitions/', '');
          definitions[k].properties = Object.assign(definitions[ref].properties, obj.properties || {});
        }
      });
    }
  });

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
