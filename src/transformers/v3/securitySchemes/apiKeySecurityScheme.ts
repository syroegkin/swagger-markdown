import { OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';

export function isApiKeySecurityScheme(
  schema: OpenAPIV3.SecuritySchemeObject,
): schema is OpenAPIV3.ApiKeySecurityScheme {
  return schema.type === 'apiKey';
}

export function transformApiKeySecuritySchema(
  name: string,
  schema: OpenAPIV3.ApiKeySecurityScheme,
) {
  const md = Markdown.md();

  md.line(md.string(`${name} (API Key Authentication)`).h4());

  if (schema.description) {
    md.line(md.string(schema.description).br());
  }

  md.line(md.string(`**Name:** ${schema.name}`).br())
    .line(md.string(`**In:** ${schema.in}`).br());

  return md.export();
}
