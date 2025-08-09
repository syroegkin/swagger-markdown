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

export type Dereferenced<T> = T extends Array<infer U>
  ? (U extends
  OpenAPIV3.ReferenceObject |
  OpenAPIV2.ReferenceObject |
  // eslint-disable-next-line camelcase
  OpenAPIV3_1.ReferenceObject ? never : U
  )[] : T extends
  OpenAPIV3.ReferenceObject |
  OpenAPIV2.ReferenceObject |
  // eslint-disable-next-line camelcase
  OpenAPIV3_1.ReferenceObject ? never : T;

export const ALLOWED_METHODS_V2 = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
export const ALLOWED_METHODS_V3 = [...ALLOWED_METHODS_V2, 'trace'];
