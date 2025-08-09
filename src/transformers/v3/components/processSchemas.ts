import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { Dereferenced } from '../../../types';
import { MDtableRow } from '../../../lib/markdown/mdtable';
import { Schema } from '../models/Schema';
import { dataTypeResolver } from '../dataTypes';

/**
 * Parse allOf definition
 * @param name of the definition
 * @param definition definition object
 */
function parsePrimitive(name: string, definition: OpenAPIV3.SchemaObject): MDtableRow {
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
 * Parse the Property field if present.
 * @param name of the definition
 * @param definition definition object
 */
function parseProperties(definition: OpenAPIV3.SchemaObject): MDtableRow[] {
  const rows: MDtableRow[] = [];
  const md = Markdown.md();
  const required = 'required' in definition ? definition.required : [];

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

export function processSchemas(schemas: OpenAPIV3.ComponentsObject['schemas']): string {
  const md = Markdown.md();

  Object.keys(schemas).forEach((schemaName: string) => {
    const schema = schemas[schemaName] as Dereferenced<OpenAPIV3.SchemaObject>;
    md.line()
      .line(md.string(schemaName).h4())
      .line();
    if (schema.description) {
      md.line(schema.description)
        .line();
    }
    const table = md.table();
    table.th('Name').th('Type').th('Description').th('Required');

    if ('properties' in schema) {
      const parsedProperties = (parseProperties(schema));
      parsedProperties.forEach((row) => table.insertRow(row));
    } else {
      table.insertRow(parsePrimitive(schemaName, schema));
    }
    md.line(table);

    if (schema.example) {
      const formattedExample = typeof schema.example === 'string'
        ? schema.example
        : JSON.stringify(schema.example, null, '  ');
      md.line()
        .line(md.string('Example').bold())
        .line(`<pre>${formattedExample}</pre>`);
    }
  });

  return md.export();
}
