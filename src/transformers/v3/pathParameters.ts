import { OpenAPIV3 } from 'openapi-types';
import { dataTypeResolver } from './dataTypes';
import { Schema } from './models/Schema';
import { Markdown } from '../../lib/markdown';

export const transformParameters = (
  parameters: OpenAPIV3.ParameterObject[] = [],
  pathParameters: OpenAPIV3.ParameterObject[] = [],
) => {
  const md = Markdown.md();

  md.line(md.string('Parameters').h5()).line();
  const table = md.table();
  table.th('Name').th('Located in').th('Description').th('Required')
    .th('Schema');

  // Combine path and operation parameters, ensuring they are V3 objects
  [...pathParameters, ...parameters].forEach((parameterObject: OpenAPIV3.ParameterObject) => {
    if (parameterObject) {
      const tr = table.tr();
      // Name first
      tr.td(parameterObject.name || '');
      // Scope (in)
      tr.td(parameterObject.in || '');
      // description
      if ('description' in parameterObject && parameterObject.description) {
        tr.td(md.string(parameterObject.description.replace(/[\r\n]/g, ' ')).escape());
      } else {
        tr.td('');
      }
      tr.td(parameterObject.required ? 'Yes' : 'No');

      // Prepare schema to be transformed - V3 parameters have schema property
      let schema: Schema | null = null;
      if ('schema' in parameterObject && parameterObject.schema) {
        // Constructor now handles ReferenceObject | SchemaObject
        schema = new Schema(parameterObject.schema);
      } else if ('content' in parameterObject && parameterObject.content) {
        // Handle parameters with 'content' instead of 'schema' (e.g., requestBody)
        // For simplicity, we might just indicate the media type or take the first one
        const mediaType = Object.keys(parameterObject.content)[0];
        if (mediaType && parameterObject.content[mediaType]?.schema) {
          // Constructor now handles ReferenceObject | SchemaObject
          schema = new Schema(parameterObject.content[mediaType].schema);
        } else {
          schema = new Schema({}); // Fallback for content without schema
        }
      } else {
        // Fallback if neither schema nor content is present
        schema = new Schema({});
      }

      tr.td(dataTypeResolver(schema)); // dataTypeResolver expects a Schema object
    }
  });

  md.line(table);
  return md.export();
};
