import { OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';

type SchemeObject = OpenAPIV3_1.SecuritySchemeObject;

export function isMutualTlsSecurityScheme(
  scheme: SchemeObject,
): boolean {
  return (scheme.type as string) === 'mutualTLS';
}

export function transformMutualTlsSecurityScheme(
  name: string,
  scheme: SchemeObject,
) {
  const md = Markdown.md();

  md.line(md.string(`${name} (Mutual TLS)`).h4());
  if (scheme.description) {
    md.line(md.string(scheme.description).br());
  }
  return md.export();
}
