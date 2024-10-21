import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { Markdown } from '../../../lib/markdown';

const DEFAULT_TEXT = 'Find more info here';

/**
 * @todo: add extensions, e.g. ^x-
 */
export function transformExternalDocs(
  externalDocs: OpenAPIV2.ExternalDocumentationObject | OpenAPIV3.ExternalDocumentationObject,
) {
  const md = Markdown.md();
  if ('url' in externalDocs) {
    md.line(md.string().link(
      externalDocs.description || DEFAULT_TEXT,
      externalDocs.url,
    ));
  }
  return md.export();
}
