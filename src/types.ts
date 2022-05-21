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
  skipInfo?: boolean;
  output?: string;
  input: string;
}
