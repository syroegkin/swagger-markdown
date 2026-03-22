import { Markdown } from '../../lib/markdown';
import { MDtableRow } from '../../lib/markdown/mdtable';
import { SchemaInterface, dataTypeResolver } from './dataTypes';

/**
 * Parse a schema without properties into a single table row.
 */
export function parsePrimitive(
  name: string,
  definition: Record<string, unknown> | null | undefined,
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
  const descriptionCell = ('description' in definition
    ? (definition.description as string) : '').replace(/[\r\n]/g, ' ');
  const requiredCell = '';
  tr.td(name)
    .td(safeType)
    .td(descriptionCell)
    .td(requiredCell);
  return tr;
}

/**
 * Parse the Property field if present.
 * @param definition definition object
 * @param SchemaClass Schema constructor to wrap property values
 */
export function parseProperties(
  definition: Record<string, unknown>,
  SchemaClass: new (prop: unknown) => SchemaInterface,
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
  const properties = definition.properties as Record<string, Record<string, unknown>>;
  const required = 'required' in definition
    ? definition.required as string[] : [];

  Object.keys(properties).forEach((propName) => {
    const tr = MDtableRow.tr();
    const prop = properties[propName];
    const typeCell = dataTypeResolver(new SchemaClass(prop));
    const descriptionParts = [];
    if ('description' in prop) {
      descriptionParts.push(
        md.string((prop.description as string).replace(/[\r\n]/g, ' ')).escape().get(),
      );
    }
    if ('enum' in prop) {
      const enumValues = (prop.enum as unknown[]).map((val) => `\`${JSON.stringify(val)}\``).join(', ');
      descriptionParts.push(
        md.string('Enum:').italic().concat(` ${enumValues}`).get(),
      );
    }
    if ('example' in prop) {
      descriptionParts.push(
        md.string('Example:').italic().concat(` \`${JSON.stringify(prop.example)}\``).get(),
      );
    }
    if ('readOnly' in prop && prop.readOnly) {
      descriptionParts.push(md.string('Read-only').bold().get());
    }
    if ('writeOnly' in prop && prop.writeOnly) {
      descriptionParts.push(md.string('Write-only').bold().get());
    }
    const descriptionCell = descriptionParts.join('<br>');
    const requiredCell = required.includes(propName) ? 'Yes' : 'No';
    tr.td(propName).td(typeCell).td(descriptionCell).td(requiredCell);
    rows.push(tr);
  });
  return rows;
}
