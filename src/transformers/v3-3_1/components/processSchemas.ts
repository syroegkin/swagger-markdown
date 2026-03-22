import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { Dereferenced } from '../../../types';
import { Schema } from '../models/Schema';
import {
  parseProperties,
  parsePrimitive,
} from '../../common/schemaProperties';

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
      const schemaRecord = schema as unknown as Record<string, unknown>;
      const parsedProperties = parseProperties(schemaRecord, Schema);
      parsedProperties.forEach((row) => table.insertRow(row));
    } else {
      const schemaRecord = schema as unknown as Record<string, unknown>;
      table.insertRow(parsePrimitive(schemaName, schemaRecord));
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
