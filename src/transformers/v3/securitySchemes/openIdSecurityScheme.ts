import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';

export function isOpenIdSecurityScheme(
  scheme: OpenAPIV3.SecuritySchemeObject,
): scheme is OpenAPIV3.OpenIdSecurityScheme {
  return scheme.type === 'openIdConnect';
}

export function transformOpenIdSecurityScheme(
  name: string,
  scheme: OpenAPIV3.OpenIdSecurityScheme,
) {
  const md = Markdown.md();

  md.line(md.string(`${name} (OpenID Connect)`).h4());

  if (scheme.description) {
    md.line(md.string(scheme.description).br());
  }

  if (scheme.openIdConnectUrl) {
    md.line(md.string(`OpenID Connect URL: ${scheme.openIdConnectUrl}`).br());
  }

  return md.export();
}
