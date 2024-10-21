import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { ALLOWED_METHODS } from '../../../types';

type AnyPathObject = OpenAPIV2.PathsObject | OpenAPIV3.PathsObject;

type Tagged<T extends AnyPathObject = AnyPathObject> = { [tag: string]: T };

/**
 * Group path and methods by tags they have
 */
export function groupPathsByTags<T extends AnyPathObject = AnyPathObject>(
  inputDoc: T,
): Tagged<T> {
  const tagged: Tagged<T> = {};

  Object.keys(inputDoc).forEach((path: string) => {
    const data = inputDoc[path];
    Object.keys(data).forEach((method) => {
      if (ALLOWED_METHODS.includes(method)) {
        const pathMethod: T extends OpenAPIV2.PathsObject
          ? OpenAPIV2.OperationObject
          : OpenAPIV3.OperationObject = data[method];
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