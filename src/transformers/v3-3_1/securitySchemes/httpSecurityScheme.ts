/* eslint-disable camelcase */
import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';

export function isHttpSecurityScheme(
  scheme: OpenAPIV3.SecuritySchemeObject | OpenAPIV3_1.SecuritySchemeObject,
): scheme is OpenAPIV3.HttpSecurityScheme | OpenAPIV3_1.HttpSecurityScheme {
  return scheme.type === 'http';
}

export function transformHTTPSecurityScheme(
  name: string,
  scheme: OpenAPIV3.HttpSecurityScheme | OpenAPIV3_1.HttpSecurityScheme,
) {
  const md = Markdown.md();

  md.line(md.string(`${name} (HTTP, ${scheme.scheme})`).h4());
  if (scheme.description) {
    md.line(md.string(scheme.description).br());
  }
  if (scheme.bearerFormat) {
    md.line(`Bearer format: ${scheme.bearerFormat}`);
  }
  return md.export();
}
