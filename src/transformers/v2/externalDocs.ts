import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';

const DEFAULT_TEXT = 'Find more info here';

/**
 * https://swagger.io/specification/v2/#externalDocumentationObject
 */
export function transformExternalDocs(externalDocs: OpenAPIV2.ExternalDocumentationObject) {
  const md = Markdown.md();
  if ('url' in externalDocs) {
    md.line(md.string().link(
      externalDocs.description || DEFAULT_TEXT,
      externalDocs.url,
    ));
  }
  return md.export();
}
