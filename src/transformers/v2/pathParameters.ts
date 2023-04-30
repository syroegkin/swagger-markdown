import { OpenAPIV2 } from 'openapi-types';
import { dataTypeResolver } from './dataTypes';
import { Schema } from '../../models/Schema';
import { Markdown } from '../../lib/markdown';

export const transformParameters = (
  parameters: OpenAPIV2.Parameters,
  pathParameters?: OpenAPIV2.Parameters,
) => {
  const md = Markdown.md();

  md.line(md.string('Parameters').h5()).line();
  const table = md.table();
  table.th('Name').th('Located in').th('Description').th('Required')
    .th('Schema');

  [].concat(pathParameters, parameters).forEach((keys: OpenAPIV2.Parameter) => {
    if (keys) {
      const tr = table.tr();
      // Name first
      tr.td(keys.name || '');
      // Scope (in)
      tr.td(keys.in || '');
      // description
      if ('description' in keys) {
        tr.td(md.string(keys.description.replace(/[\r\n]/g, ' ')).escape());
      } else {
        tr.td('');
      }
      tr.td(keys.required ? 'Yes' : 'No');

      // Prepare schema to be transformed
      let schema = null;
      if ('schema' in keys) {
        schema = new Schema(keys.schema);
      } else {
        schema = new Schema();
        schema.setType('type' in keys ? keys.type : null);
        schema.setFormat('format' in keys ? keys.format : null);
        schema.setReference('$ref' in keys ? keys.$ref : null);
        schema.setItems('items' in keys ? keys.items : null);
      }

      tr.td(dataTypeResolver(schema));
    }
  });

  md.line(table);
  return md.export();
};
