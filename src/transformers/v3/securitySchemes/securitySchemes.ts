import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import { isHttpSecurityScheme, transformHTTPSecurityScheme } from './httpSecurityScheme';
import { isApiKeySecurityScheme, transformApiKeySecuritySchema } from './apiKeySecurityScheme';
import { isOAuth2SecurityScheme, transformOAuth2SecurityScheme } from './OAuth2SecurityScheme';
import { isOpenIdSecurityScheme, transformOpenIdSecurityScheme } from './openIdSecurityScheme';

export function transformSecuritySchemes(
  securitySchemas: { [key: string]: OpenAPIV3.SecuritySchemeObject },
) {
  const md = Markdown.md();

  Object.keys(securitySchemas).forEach((type) => {
    const schema = securitySchemas[type];

    if (isHttpSecurityScheme(schema)) {
      md.line(transformHTTPSecurityScheme(type, schema));
    }

    if (isApiKeySecurityScheme(schema)) {
      md.line(transformApiKeySecuritySchema(type, schema));
    }

    if (isOAuth2SecurityScheme(schema)) {
      md.line(transformOAuth2SecurityScheme(type, schema));
    }

    if (isOpenIdSecurityScheme(schema)) {
      md.line(transformOpenIdSecurityScheme(type, schema));
    }
  });

  if (md.length > 0) {
    return Markdown.md()
      .line(md.string('Available authorizations').h3())
      .line(md.export())
      .export();
  }

  return null;
}
