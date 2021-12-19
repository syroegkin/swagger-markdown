import { OpenAPIV2 } from 'openapi-types';
import { Markdown } from '../lib/markdown';

const DEFAULT_TEXT = 'Find more info here';

export function transformExternalDocs(externalDocs: OpenAPIV2.ExternalDocumentationObject) {
  const md = new Markdown();
  if ('url' in externalDocs) {
    md.link(externalDocs.description || DEFAULT_TEXT, externalDocs.url).append();
  }
  return md.export();
}
