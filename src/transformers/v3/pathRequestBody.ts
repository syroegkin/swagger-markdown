import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { Dereferenced } from '../../types';
import { Schema } from './models/Schema';
import { dataTypeResolver } from './dataTypes';

export function transformRequestBody(
  requestBody: OpenAPIV3.RequestBodyObject,
) {
  const md = Markdown.md();
  md.line(md.string('Request Body').h4()).line();
  if ('descrtiption' in requestBody && requestBody.description) {
    md.line(md.string(requestBody.description).escape()).line();
  }

  const table = md.table();
  table.th('Required').th('Schema');
  const tr = table.tr();

  // Required
  tr.td(requestBody.required ? ' Yes' : ' No');

  const { content } = requestBody;
  const td = md.string();
  Object.keys(content).forEach((contentType: string) => {
    const { schema } = content[contentType];
    if (schema) {
      const schemaObject = new Schema(schema as Dereferenced<typeof schema>);
      td.concat(`${md.string(contentType).bold()}: `);
      td.concat(dataTypeResolver(schemaObject)).br(true);
    }
    tr.td(td);
  });
  md.line(table);
  return md.export();
}
