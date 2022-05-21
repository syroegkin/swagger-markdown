import { OpenAPIV2 } from 'openapi-types';
import { Options } from '../types';
import { transformInfo } from './info';
import { transformPath } from './path';
import { transformSecurityDefinitions } from './securityDefinitions';
import { transformExternalDocs } from './externalDocs';
import { transformDefinition } from './definitions';

export function transformSwaggerV2(
  inputDoc: OpenAPIV2.Document,
  options: Options,
): string {
  const document = [];

  // Process info
  if (!options.skipInfo && 'info' in inputDoc) {
    document.push(transformInfo(inputDoc.info));
  }

  if ('externalDocs' in inputDoc) {
    document.push(transformExternalDocs(inputDoc.externalDocs));
  }

  // Security definitions
  if ('securityDefinitions' in inputDoc) {
    document.push(transformSecurityDefinitions(inputDoc.securityDefinitions));
  // } else if (inputDoc.components && inputDoc.components.securitySchemas) {
  //   document.push(transformSecurityDefinitions(inputDoc.components.securityDefinitions));
  }

  // Collect parameters
  const parameters = 'parameters' in inputDoc ? inputDoc.parameters : {};

  // Process Paths
  if ('paths' in inputDoc) {
    Object.keys(inputDoc.paths).forEach((path) => document.push(transformPath(
      path,
      inputDoc.paths[path],
      parameters,
    )));
  }

  // Models (definitions)
  if ('definitions' in inputDoc) {
    document.push(transformDefinition(inputDoc.definitions));
  // } else if (inputDoc.components && inputDoc.components.schemas) {
  //   document.push(transformDefinition(inputDoc.components.schemas));
  }

  // Glue all pieces down
  const plainDocument = document.join('\n');

  return plainDocument;
}
