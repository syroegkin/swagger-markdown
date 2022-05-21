import { OpenAPIV2 } from 'openapi-types';
import { transformResponses } from './pathResponses';
import { transformParameters } from './pathParameters';
import { transformSecurity } from './security';
import { textEscape } from '../lib/textEscape';

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

export const transformPath = (path: string, data, parameters?: any) => {
  const res = [];
  let pathParameters = null;

  if (!path || !data) {
    return null;
  }

  // Make path as a header
  res.push(`### ${path}\n`);

  // Check if parameter for path are in the place
  if ('parameters' in data) {
    pathParameters = data.parameters;
  }

  // Go further method by methods
  Object.keys(data).forEach((method) => {
    if (ALLOWED_METHODS.includes(method)) {
      // Set method as a subheader
      res.push(`#### ${method.toUpperCase()}`);
      const pathInfo = data[method];

      // Set summary
      if ('summary' in pathInfo) {
        res.push(`##### Summary:\n\n${textEscape(pathInfo.summary)}\n`);
      }

      // Set description
      if ('description' in pathInfo) {
        res.push(`##### Description:\n\n${textEscape(pathInfo.description)}\n`);
      }

      // Build parameters
      if ('parameters' in pathInfo || pathParameters) {
        // This won't work
        // res.push(`${transformParameters(pathInfo.parameters, pathParameters, parameters)}\n`);
        res.push(`${transformParameters(pathInfo.parameters, pathParameters)}\n`);
      }

      // Build responses
      if ('responses' in pathInfo) {
        res.push(`${transformResponses(pathInfo.responses)}\n`);
      }

      // Build security
      if ('security' in pathInfo) {
        res.push(`${transformSecurity(pathInfo.security)}\n`);
      }
    }
  });

  return res.length ? res.join('\n') : null;
};
