import { OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';
import {
  SecuritySchemesMap,
  transformSecuritySchemesContent,
} from '../../v3-3_1/securitySchemes/securitySchemes';
import { isMutualTlsSecurityScheme, transformMutualTlsSecurityScheme } from './mutualTlsSecurityScheme';

export function transformSecuritySchemes(securitySchemas: SecuritySchemesMap) {
  const md = Markdown.md();

  // Shared schemes (http, apiKey, oauth2, openIdConnect)
  transformSecuritySchemesContent(securitySchemas, md);

  // v3.1-only: mutualTLS
  Object.keys(securitySchemas).forEach((name) => {
    const raw = securitySchemas[name];
    if (raw && '$ref' in raw && raw.$ref) {
      return;
    }
    const schema = raw as OpenAPIV3_1.SecuritySchemeObject;
    if (isMutualTlsSecurityScheme(schema)) {
      md.line(transformMutualTlsSecurityScheme(name, schema));
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
