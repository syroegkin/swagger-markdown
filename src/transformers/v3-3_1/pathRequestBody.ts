import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { Dereferenced } from '../../types';
import { Schema } from './models/Schema';
import { dataTypeResolver } from '../common/dataTypes';

export function transformRequestBody(
  requestBody: OpenAPIV3.RequestBodyObject | OpenAPIV3_1.RequestBodyObject,
) {
  const md = Markdown.md();
  md.line(md.string('Request Body').h4()).line();
  if ('description' in requestBody && requestBody.description) {
    md.line(md.string(requestBody.description).escape()).line();
  }

  const table = md.table();
  table.th('Required').th('Schema');
  const tr = table.tr();

  // Required
  tr.td(requestBody.required ? ' Yes' : ' No');

  const { content } = requestBody;
  const schemaTd = md.string();
  Object.keys(content).forEach((contentType: string) => {
    const { schema } = content[contentType];
    if (schema) {
      const schemaObject = new Schema(schema as Dereferenced<typeof schema>);
      schemaTd.concat(`${md.string(contentType).bold()}: `);
      schemaTd.concat(dataTypeResolver(schemaObject)).br(true);
    }
  });
  tr.td(schemaTd);
  md.line(table);
  return md.export();
}
