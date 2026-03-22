import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { isHttpSecurityScheme, transformHTTPSecurityScheme } from './httpSecurityScheme';
import { isApiKeySecurityScheme, transformApiKeySecuritySchema } from './apiKeySecurityScheme';
import { isOAuth2SecurityScheme, transformOAuth2SecurityScheme } from './OAuth2SecurityScheme';
import { isOpenIdSecurityScheme, transformOpenIdSecurityScheme } from './openIdSecurityScheme';

export type SecuritySchemesMap = {
  [key: string]:
  | OpenAPIV3.SecuritySchemeObject
  | OpenAPIV3_1.SecuritySchemeObject
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.ReferenceObject;
};

export function transformSecuritySchemesContent(
  securitySchemas: SecuritySchemesMap,
  md: Markdown,
) {
  type SchemeObject = OpenAPIV3.SecuritySchemeObject | OpenAPIV3_1.SecuritySchemeObject;

  Object.keys(securitySchemas).forEach((type) => {
    const raw = securitySchemas[type];
    if (raw && '$ref' in raw && raw.$ref) {
      return;
    }
    const schema = raw as SchemeObject;

    if (isHttpSecurityScheme(schema)) {
      md.line(transformHTTPSecurityScheme(type, schema));
    } else if (isApiKeySecurityScheme(schema)) {
      md.line(transformApiKeySecuritySchema(type, schema));
    } else if (isOAuth2SecurityScheme(schema)) {
      md.line(transformOAuth2SecurityScheme(type, schema));
    } else if (isOpenIdSecurityScheme(schema)) {
      md.line(transformOpenIdSecurityScheme(type, schema));
    }
  });
}

export function transformSecuritySchemes(securitySchemas: SecuritySchemesMap) {
  const md = Markdown.md();
  transformSecuritySchemesContent(securitySchemas, md);

  if (md.length > 0) {
    return Markdown.md()
      .line(md.string('Available authorizations').h3())
      .line(md.export())
      .export();
  }

  return null;
}
