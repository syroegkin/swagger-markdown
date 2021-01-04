const dataTypeTransformer = require('./dataTypes');
const inArray = require('../lib/inArray');
const Schema = require('../models/schema');
const textEscape = require('../lib/textEscape');
const anchor = require('../lib/anchor');

/**
 * If Property field is present parse them.
 * @param name of the definition
 * @param definition definition object
 */
const parseProperties = (name, definition) => {
  const required = 'required' in definition ? definition.required : [];
  const res = [];
  Object.keys(definition.properties).forEach(propName => {
    const prop = definition.properties[propName];
    const typeCell = dataTypeTransformer(new Schema(prop));
    const descriptionParts = [];
    if ('description' in prop) {
      descriptionParts.push(
          textEscape(
              prop.description.replace(/[\r\n]/g, ' '),
          ),
      );
    }
    if ('enum' in prop) {
      const enumValues = prop.enum.map(val => `\`${JSON.stringify(val)}\``).join(', ');
      descriptionParts.push(`_Enum:_ ${enumValues}`);
    }
    if ('example' in prop) {
      descriptionParts.push(`_Example:_ \`${JSON.stringify(prop.example)}\``);
    }
    const descriptionCell = descriptionParts.join('<br>');
    const requiredCell = inArray(propName, required) ? 'Yes' : 'No';
    res.push(`| ${propName} | ${typeCell} | ${descriptionCell} | ${requiredCell} |`);
  });
  return res;
};

/**
 * Parse allOf definition
 * @param name of the definition
 * @param definition definition object
 */
const parsePrimitive = (name, definition) => {
  const res = [];
  const typeCell = 'type' in definition ? definition.type : '';
  const descriptionCell = ('description' in definition ? definition.description : '').replace(/[\r\n]/g, ' ');
  const requiredCell = '';
  res.push(`| ${name} | ${typeCell} | ${descriptionCell} | ${requiredCell} |`);
  return res;
};

/**
 * @param {type} name
 * @param {type} definition
 * @return {type} Description
 */
const processDefinition = (name, def, skipHead) => {
  const definition = {...def};
  let res = [];
  let parsedDef = [];

  if (!skipHead) {
    res.push('');
    res.push(`### ${name}`);
    if ('properties' in definition && definition.propRef) {
      delete definition.propRef;
      res.push(`#### ${anchor(name)}`);
    }
    res.push('');
    if (definition.description) {
      res.push(definition.description);
      res.push('');
    }
    res.push('| Name | Type | Description | Required |');
    res.push('| ---- | ---- | ----------- | -------- |');
  }

  if ('allOf' in definition) {
    res = res.concat(definition.allOf.map(item => processDefinition(name, item, true)));
  } else if ('$ref' in definition) {
    parsedDef = [`| ref | ${dataTypeTransformer(new Schema(definition))} | Inherited | |`];
  } else if ('properties' in definition) {
    parsedDef = parseProperties(name, definition);
  } else {
    parsedDef = parsePrimitive(name, definition);
  }
  res = res.concat(parsedDef);

  if (definition.example) {
    const formattedExample =
        typeof definition.example === 'string'
            ? definition.example
            : JSON.stringify(definition.example, null, '  ');
    res.push('');
    res.push('**Example**');
    res.push(`<pre>${formattedExample}</pre>`);
  }

  return res.length ? res.join('\n') : null;
};
module.exports.processDefinition = processDefinition;

/**
 * @param {type} definitions
 * @return {type} Description
 */
module.exports = definitions => {
  const res = [];
  Object.keys(definitions).map(definitionName => res.push(processDefinition(
      definitionName,
      definitions[definitionName]
  )));
  if (res.length > 0) {
    res.unshift('### Models\n');
    return res.join('\n');
  }
  return null;
};
