import { OpenAPIV3 } from 'openapi-types';
import { Dereferenced } from '../../../types';

export function processRequestBodies(schemas: OpenAPIV3.ComponentsObject['requestBodies']): string {
  const md = [];
  Object.keys(schemas).forEach((requestBodyName) => {
    const requestBody = schemas[requestBodyName] as Dereferenced<
      typeof schemas[typeof requestBodyName]
    >;
    if (requestBody) {
      md.push(`### Request Body: ${requestBodyName}`);
      if (requestBody.description) {
        md.push(requestBody.description);
      }
      if (requestBody.content) {
        Object.keys(requestBody.content).forEach((mediaType) => {
          md.push(`#### Media Type: ${mediaType}`);
          md.push('```json');
          md.push(JSON.stringify(requestBody.content[mediaType].schema, null, 2));
          md.push('```');
        });
      }
      md.push('');
    }
  });
  return md.join('\n');
}
