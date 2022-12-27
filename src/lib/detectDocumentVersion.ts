// eslint-disable-next-line camelcase
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { AllSwaggerDocumentVersions } from '../types';

export function isV2Document(document: AllSwaggerDocumentVersions): document is OpenAPIV2.Document {
  if (('swagger' in document)) {
    const [major] = document.swagger.split(/\./);
    return major === '2';
  }
  return false;
}

export function isV3Document(document: AllSwaggerDocumentVersions): document is OpenAPIV3.Document {
  if ('openapi' in document) {
    const [major] = document.openapi.split(/\./);
    return major === '3';
  }
  return false;
}

export function isV31Document(
  document: AllSwaggerDocumentVersions,
// eslint-disable-next-line camelcase
): document is OpenAPIV3_1.Document {
  if ('openapi' in document) {
    const [major, minor] = document.openapi.split(/\./);
    return major === '3' && minor === '1';
  }
  return false;
}
