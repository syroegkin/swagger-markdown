import { OpenAPIV3 } from 'openapi-types';

export function processSchemas(schemas: OpenAPIV3.ComponentsObject['schemas']): string {
  const md = [];
  Object.keys(schemas).forEach((schemaName) => {
    const schema = schemas[schemaName];
    if (schema) {
      md.push(`### Schema: ${schemaName}`);
      md.push('```json');
      md.push(JSON.stringify(schema, null, 2));
      md.push('```');
      md.push('');
    }
  });
  return md.join('\n');
}
