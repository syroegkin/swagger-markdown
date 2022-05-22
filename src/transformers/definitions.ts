import { dataTypeResolver } from './dataTypes';
import { Schema } from '../models/schema';
import { textEscape } from '../lib/textEscape';

/**
 * If Property field is present parse them.
 * @param name of the definition
 * @param definition definition object
 */
function parseProperties(name: string, definition) {
  const required = 'required' in definition ? definition.required : [];
  const res = [];
  Object.keys(definition.properties).forEach((propName) => {
    const prop = definition.properties[propName];
    const typeCell = dataTypeResolver(new Schema(prop));
    const descriptionParts = [];
    if ('description' in prop) {
      descriptionParts.push(
        textEscape(
          prop.description.replace(/[\r\n]/g, ' '),
        ),
      );
    }
    if ('enum' in prop) {
      const enumValues = prop.enum.map((val) => `\`${JSON.stringify(val)}\``).join(', ');
      descriptionParts.push(`*Enum:* ${enumValues}`);
    }
    if ('example' in prop) {
      descriptionParts.push(`*Example:* \`${JSON.stringify(prop.example)}\``);
    }
    const descriptionCell = descriptionParts.join('<br>');
    const requiredCell = required.includes(propName) ? 'Yes' : 'No';
    res.push(`| ${propName} | ${typeCell} | ${descriptionCell} | ${requiredCell} |`);
  });
  return res;
}

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
export const processDefinition = (name, definition) => {
  let res = [];
  let parsedDef = [];
  res.push('');
  res.push(`#### ${name}`);
  res.push('');
  if (definition.description) {
    res.push(definition.description);
    res.push('');
  }
  res.push('| Name | Type | Description | Required |');
  res.push('| ---- | ---- | ----------- | -------- |');

  if ('properties' in definition) {
    parsedDef = parseProperties(name, definition);
  } else {
    parsedDef = parsePrimitive(name, definition);
  }
  res = res.concat(parsedDef);

  if (definition.example) {
    const formattedExample = typeof definition.example === 'string'
      ? definition.example
      : JSON.stringify(definition.example, null, '  ');
    res.push('');
    res.push('**Example**');
    res.push(`<pre>${formattedExample}</pre>`);
  }

  return res.length ? res.join('\n') : null;
};

/**
 * @param {type} definitions
 * @return {type} Description
 */
export const transformDefinition = (definitions) => {
  const res = [];
  Object.keys(definitions).forEach((definitionName) => res.push(processDefinition(
    definitionName,
    definitions[definitionName],
  )));
  if (res.length > 0) {
    res.unshift('### Models\n');
    return res.join('\n');
  }
  return null;
};
