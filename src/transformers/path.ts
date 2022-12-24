import { OpenAPIV2 } from 'openapi-types';
import { transformResponses } from './pathResponses';
import { transformParameters } from './pathParameters';
import { transformSecurity } from './security';
import { Markdown } from '../lib/markdown';

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

export const transformPath = (
  path: string,
  data: OpenAPIV2.PathItemObject,
  parameters?: any,
): string | null => {
  let pathParameters = null;

  if (!path || !data) {
    return null;
  }

  const md = Markdown.md();

  // Make path as a header
  // res.push(`### ${path}\n`);
  md.line(md.string(path).h3());

  // Check if parameter for path are in the place
  if ('parameters' in data) {
    pathParameters = data.parameters;
  }

  // Go further method by methods
  Object.keys(data).forEach((method) => {
    if (ALLOWED_METHODS.includes(method)) {
      md.line('');
      // Set method as a subheader
      md.line(md.string(method.toUpperCase()).h4());
      const pathInfo: OpenAPIV2.OperationObject = data[method];

      // Set summary
      if ('summary' in pathInfo) {
        md.line(md.string('Summary:').h5())
          .line()
          .line(md.string(pathInfo.summary).escape())
          .line();
      }

      // Set description
      if ('description' in pathInfo) {
        md.line(md.string('Description:').h5())
          .line()
          .line(md.string(pathInfo.description).escape())
          .line();
      }

      // Build parameters
      if ('parameters' in pathInfo || pathParameters) {
        const builtParameters = md.string(transformParameters(
          pathInfo.parameters,
          pathParameters,
        ));
        if (builtParameters.length) {
          md.line(builtParameters).line();
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
        md.line(md.string(transformSecurity(pathInfo.security)));
      }
    }
  });

  // return res.length ? res.join('\n') : null;
  return md.export();
};
