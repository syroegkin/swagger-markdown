import { OpenAPIV2 } from 'openapi-types';
import { dataTypeResolver } from './v2/dataTypes';
import { Schema } from '../models/Schema';
import { Markdown } from '../lib/markdown';
import { MDtableRow } from '../lib/markdown/mdtable';

/**
 * Parse the Property field if present.
 * @param name of the definition
 * @param definition definition object
 */
function parseProperties(definition: OpenAPIV2.SchemaObject): MDtableRow[] {
  const rows: MDtableRow[] = [];
  const md = Markdown.md();
  const required = 'required' in definition ? definition.required : [];
  // const res = [];
  Object.keys(definition.properties).forEach((propName) => {
    const tr = MDtableRow.tr();
    const prop = definition.properties[propName];
    const typeCell = dataTypeResolver(new Schema(prop));
    const descriptionParts = [];
    if ('description' in prop) {
      descriptionParts.push(
        md.string(prop.description.replace(/[\r\n]/g, ' ')).escape().get(),
      );
    }
    if ('enum' in prop) {
      const enumValues = prop.enum.map((val) => `\`${JSON.stringify(val)}\``).join(', ');
      descriptionParts.push(
        md.string('Enum:').italic().concat(` ${enumValues}`).get(),
      );
    }
    if ('example' in prop) {
      descriptionParts.push(
        md.string('Example:').italic().concat(` \`${JSON.stringify(prop.example)}\``).get(),
      );
    }
    const descriptionCell = descriptionParts.join('<br>');
    const requiredCell = required.includes(propName) ? 'Yes' : 'No';
    tr.td(propName).td(typeCell).td(descriptionCell).td(requiredCell);
    rows.push(tr);
  });
  return rows;
}

/**
 * Parse allOf definition
 * @param name of the definition
 * @param definition definition object
 */
function parsePrimitive(name: string, definition: OpenAPIV2.SchemaObject): MDtableRow {
  const tr = MDtableRow.tr();
  const typeCell = 'type' in definition ? definition.type : '';
  const descriptionCell = ('description' in definition ? definition.description : '').replace(/[\r\n]/g, ' ');
  const requiredCell = '';
  tr.td(name)
    .td(Array.isArray(typeCell) ? typeCell.join(', ') : typeCell)
    .td(descriptionCell)
    .td(requiredCell);
  return tr;
}

/**
 * @param {type} name
 * @param {type} definition
 * @return {type} Description
 */
export function processDefinition(name: string, definition: OpenAPIV2.SchemaObject) {
  const md = Markdown.md();
  md.line()
    .line(md.string(name).h4())
    .line();
  if (definition.description) {
    md.line(definition.description)
      .line();
  }
  const table = md.table();
  table.th('Name').th('Type').th('Description').th('Required');

  if ('properties' in definition) {
    const parsedProperties = (parseProperties(definition));
    parsedProperties.forEach((row) => table.insertRow(row));
  } else {
    table.insertRow(parsePrimitive(name, definition));
  }
  md.line(table);

  if (definition.example) {
    const formattedExample = typeof definition.example === 'string'
      ? definition.example
      : JSON.stringify(definition.example, null, '  ');
    md.line()
      .line(md.string('Example').bold())
      .line(`<pre>${formattedExample}</pre>`);
  }

  return md.export();
}

/**
 * @param {type} definitions
 * @return {type} Description
 */
export function transformDefinition(definitions: OpenAPIV2.DefinitionsObject): string | null {
  let hasDefinitions = false;
  const md = Markdown.md();
  md
    .line(md.string('Models').h3())
    .line();

  Object.keys(definitions).forEach((definitionName: string) => {
    const processedDefinition = processDefinition(
      definitionName,
      definitions[definitionName],
    );
    if (processedDefinition) {
      hasDefinitions = true;
      md.line(processedDefinition);
    }
  });
  if (hasDefinitions) {
    return md.export();
  }
  return null;
}
