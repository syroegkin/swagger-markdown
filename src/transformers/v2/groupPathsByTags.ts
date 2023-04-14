import { OpenAPIV2 } from 'openapi-types';
import { ALLOWED_METHODS } from '../../types';

type Tagged = { [tag: string]: OpenAPIV2.PathsObject };

/**
 * Group path and methods by tags they have
 */
export function groupPathsByTags(
  inputDoc: OpenAPIV2.PathsObject,
): Tagged {
  const tagged: Tagged = {};

  Object.keys(inputDoc).forEach((path: string) => {
    const data = inputDoc[path];
    Object.keys(data).forEach((method) => {
      if (ALLOWED_METHODS.includes(method)) {
        const pathMethod: OpenAPIV2.OperationObject = data[method];
        const tags = pathMethod.tags || [''];
        tags.forEach((tagName) => {
          if (!tagged[tagName]) {
            tagged[tagName] = {
              ...tagged[tagName],
              [path]: {
                parameters: data.parameters,
                $ref: data.$ref,
              },
            };
          }
          tagged[tagName] = {
            ...tagged[tagName],
            ...{
              [path]: {
                ...tagged[tagName][path],
                [method]: pathMethod,
              },
            },
          };
        });
      }
    });
  });
  return tagged;
}
