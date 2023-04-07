import {
  // eslint-disable-next-line camelcase
  OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1,
} from 'openapi-types';

export type AllSwaggerDocumentVersions = OpenAPI.Document
| OpenAPIV2.Document
| OpenAPIV3.Document
// eslint-disable-next-line camelcase
| OpenAPIV3_1.Document;

export interface Options {
  skipInfo?: boolean; // Allows to skip info section
  output?: string;
  input: string;
  forceVersion?: string;
}

export const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
