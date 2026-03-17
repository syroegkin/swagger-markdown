/* eslint-disable camelcase */
import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import {
  ALLOWED_METHODS_V3,
  Dereferenced,
} from '../../types';
import { transformExternalDocs } from '../common/externalDocs';
import { transformSecurity } from '../common/security';
import { transformResponses } from './pathResponses';
import { transformParameters } from './pathParameters';
import { transformRequestBody } from './pathRequestBody';

export type PathItemLike =
  | OpenAPIV3.PathItemObject
  | OpenAPIV3_1.PathItemObject
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.ReferenceObject;

export function transformPath(
  path: string,
  data: PathItemLike,
): string | null {
  let pathParameters: (OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject)[] = [];

  if (!path || !data) {
    return null;
  }
  if ('$ref' in data && data.$ref) {
    return null;
  }

  const pathItem = data as OpenAPIV3.PathItemObject | OpenAPIV3_1.PathItemObject;
  const md = Markdown.md();

  // Check if parameter for path are in the place
  if ('parameters' in pathItem) {
    pathParameters = pathItem.parameters as Dereferenced<typeof pathItem.parameters>;
  }

  // Go further method by methods
  Object.keys(pathItem).forEach((method) => {
    if (ALLOWED_METHODS_V3.includes(method)) {
      const pathInfo: OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject = pathItem[method];

      const deprecated = 'deprecated' in pathInfo && pathInfo.deprecated === true;

      md.line('');
      const header = (md.string(`[${method.toUpperCase()}] ${path}`));
      if (deprecated) {
        header.strikethrough();
      }
      header.h3();
      md.line(header);

      // Deprecation
      if (deprecated) {
        md.line().line(md.string('DEPRECATED').bold().italic()).line();
      }

      // Set summary
      if ('summary' in pathInfo) {
        md.line(md.string(pathInfo.summary).escape().bold()).line();
      }

      // Set description
      if ('description' in pathInfo && pathInfo.summary !== pathInfo.description) {
        md.line(md.string(pathInfo.description).escape()).line();
      }

      // Set externalDocs
      if ('externalDocs' in pathInfo) {
        md.line(
          md.string('Documentation:').bold(),
          md.string(' '),
          transformExternalDocs(pathInfo.externalDocs),
        );
      }

      // Build parameters
      if ('parameters' in pathInfo || pathParameters) {
        const builtParameters = md.string(transformParameters(
          pathInfo.parameters as Dereferenced<typeof pathInfo.parameters>,
          pathParameters,
        ));
        if (builtParameters.length) {
          md.line(builtParameters).line();
        }
      }

      // Build Request bodies
      if ('requestBody' in pathInfo && pathInfo.requestBody) {
        const requestBody = pathInfo.requestBody as Dereferenced<typeof pathInfo.requestBody>;
        if (requestBody) {
          const builtRequestBody = md.string(
            transformRequestBody(requestBody),
          );
          if (builtRequestBody.length) {
            md.line(builtRequestBody).line();
          }
        }
      }

      // Build responses
      if ('responses' in pathInfo) {
        const builtResponses = md.string(transformResponses(
          pathInfo.responses,
        ));
        if (builtResponses.length) {
          md.line(builtResponses).line();
        }
      }

      // Build security
      if ('security' in pathInfo) {
        md.line(
          transformSecurity(pathInfo.security),
        );
      }
    }
  });

  return md.export();
}
