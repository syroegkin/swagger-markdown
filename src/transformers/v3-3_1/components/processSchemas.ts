import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
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
function parsePrimitive(
  name: string,
  definition: OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject | null | undefined,
): MDtableRow {
  const tr = MDtableRow.tr();
  if (definition == null || typeof definition !== 'object') {
    definition = {};
  }
  const typeCell = 'type' in definition ? definition.type : '';
  let safeType = '';
  if (typeCell !== undefined) {
    safeType = Array.isArray(typeCell) ? typeCell.join(', ') : String(typeCell);
  }
  const descriptionCell = ('description' in definition ? definition.description : '').replace(/[\r\n]/g, ' ');
  const requiredCell = '';
  tr.td(name)
    .td(safeType)
    .td(descriptionCell)
    .td(requiredCell);
  return tr;
}

/**
 * Parse the Property field if present.
 * @param name of the definition
 * @param definition definition object
 */
function parseProperties(
  definition: OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject,
): MDtableRow[] {
  const hasValidProperties = definition
    && typeof definition === 'object'
    && 'properties' in definition
    && definition.properties
    && typeof definition.properties === 'object';
  if (!hasValidProperties) {
    return [];
  }
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

export function processSchemas(
  schemas: OpenAPIV3.ComponentsObject['schemas'] | OpenAPIV3_1.ComponentsObject['schemas'],
): string {
  const md = Markdown.md();

  Object.keys(schemas).forEach((schemaName: string) => {
    const schema = schemas[schemaName] as
      Dereferenced<OpenAPIV3.SchemaObject> | OpenAPIV3_1.SchemaObject | boolean | null;
    if (schema === true) {
      md.line()
        .line(md.string(schemaName).h4())
        .line(`${schemaName} (schema allows any instance)`);
      return;
    }
    if (schema === false) {
      md.line()
        .line(md.string(schemaName).h4())
        .line(`${schemaName} (schema allows no instance)`);
      return;
    }
    if (schema === null || typeof schema !== 'object') {
      return;
    }
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

    const schemaWithExamples = schema as { example?: unknown; examples?: unknown[] };
    const hasExamples = Array.isArray(schemaWithExamples.examples)
      && schemaWithExamples.examples.length > 0;
    const exampleValue = schema.example ?? (
      hasExamples ? schemaWithExamples.examples![0] : undefined
    );
    if (exampleValue !== undefined) {
      const formattedExample = typeof exampleValue === 'string'
        ? exampleValue
        : JSON.stringify(exampleValue, null, '  ');
      md.line()
        .line(md.string('Example').bold())
        .line(`<pre>${formattedExample}</pre>`);
    }
  });

  return md.export();
}
