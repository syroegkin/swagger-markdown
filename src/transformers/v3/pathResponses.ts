import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import { transformHeaders } from '../common/v2-3/headers';
import { processLink } from './link';
import { dataTypeResolver } from './dataTypes';
import { Schema } from './models/Schema';
import { Dereferenced } from '../../types';

/**
 * Checks if the given response object contains a schema.
 *
 * @param response - An OpenAPI V3 response object.
 * @returns A boolean indicating whether the response contains a schema.
 */
function hasSchemaInResponse(response: OpenAPIV3.ResponseObject): boolean {
  if ('content' in response) {
    return Object.values(response.content).some((data) => 'schema' in data);
  }
  return false;
}

/**
 * Checks if any response in the given responses object contains schemas.
 *
 * @param responses - An object containing OpenAPI V3 response objects.
 * @returns A boolean indicating whether any res
 * ponse contains schemas.
 */
export function hasSchemasInResponses(responses: OpenAPIV3.ResponsesObject): boolean {
  return Object.values(responses).some(hasSchemaInResponse);
}

/**
 * Checks if any response in the given responses object contains links.
 *
 * @param responses - An object containing OpenAPI V3 response objects.
 * @returns A boolean indicating whether any response contains links.
 */
export function hasLinksInResponses(responses: OpenAPIV3.ResponsesObject): boolean {
  return Object.values(responses).some((response) => 'links' in response);
}

/**
 * Build responses table
 */
export function transformResponses(responses: OpenAPIV3.ResponsesObject) {
  const md = Markdown.md();
  md.line(md.string('Responses').h4()).line();

  const hasSchemas = hasSchemasInResponses(responses);
  const hasLinks = hasLinksInResponses(responses);

  const table = md.table();
  table.th('Code').th('Description');

  if (hasSchemas) {
    table.th('Schema');
  }
  if (hasLinks) {
    table.th('Links');
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
        transformHeaders(response.headers as never),
      );
    }

    tr.td(description);

    // Schema
    if (hasSchemaInResponse(response as Dereferenced<typeof response>)) {
      const { content } = (response as Dereferenced<typeof response>);
      if (content) {
        const td = md.string();
        Object.keys(content).forEach((contentType: string) => {
          const { schema } = content[contentType];
          if (schema) {
            const schemaObject = new Schema(schema as Dereferenced<typeof schema>);
            // tr.td(dataTypeResolver(schemaObject));
            td.concat(`${md.string(contentType).bold()}: `);
            td.concat(dataTypeResolver(schemaObject)).br(true);
          }
        });
        tr.td(td);
      } else {
        tr.td('');
      }
    } else if (hasSchemas) {
      tr.td('');
    }

    if ('links' in response) {
      const linksMd = md.string();
      Object.keys(response.links).forEach((linkName: string) => {
        const link = response.links[linkName];
        linksMd.concat(processLink(linkName, link as Dereferenced<typeof link>));
      });
      tr.td(linksMd);
    } else if (hasLinks) {
      tr.td('');
    }
  });

  md.line(table);
  return md.export();
}
