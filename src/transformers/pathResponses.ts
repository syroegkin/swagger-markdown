import { OpenAPIV2 } from 'openapi-types';
import { Schema } from '../models/Schema';
import { dataTypeResolver } from './v2/dataTypes';
import { Markdown } from '../lib/markdown';
import { transformHeaders } from './v2/headers';

/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 */
export function transformResponses(responses: OpenAPIV2.ResponsesObject) {
  const md = Markdown.md();
  md.line(md.string('Responses').h5())
    .line();

  // Check if schema somewhere
  const schemas = Object.keys(responses).reduce(
    (acc, response) => acc || 'schema' in responses[response],
    false,
  );

  const table = md.table();
  table.th('Code').th('Description');
  if (schemas) {
    table.th('Schema');
  }

  Object.keys(responses).forEach((responseCode) => {
    const tr = table.tr();
    const response = responses[responseCode];
    // Response
    tr.td(responseCode);

    // Description
    const description = md.string();
    if ('description' in response) {
      description.concat(
        md.string(response.description.replace(/[\r\n]/g, ' ')).escape(),
      );
    }
    if ('headers' in response) {
      description.concat(md.string('').br(true));
      description.concat(
        transformHeaders(response.headers),
      );
    }
    if ('examples' in response) {
      Object.entries(response.examples).forEach(([contentType, example]) => {
        let formattedExample = typeof example === 'string' ? example : JSON.stringify(example, null, '  ');

        formattedExample = formattedExample.replace(/\r?\n/g, '<br>');
        const contentTypeMd = md.string(contentType).italic().get();

        description
          .concat('<br><br>')
          .concat(md.string('Example').bold())
          .concat(` (${contentTypeMd}):<br><pre>${formattedExample}</pre>`);
      });
    }
    tr.td(description);

    // Schema
    if ('schema' in response) {
      const schema = new Schema(response.schema);
      tr.td(dataTypeResolver(schema));
    } else if (schemas) {
      tr.td('');
    }
  });

  md.line(table);
  return md.export();
}
