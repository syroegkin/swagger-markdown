import { OpenAPIV3 } from 'openapi-types';
import { ALLOWED_METHODS_V3, Options } from '../types';
import { transformInfo } from './common/info';
import { transformPath } from './v3-3_1/path';
import { Markdown } from '../lib/markdown';
import { transformExternalDocs } from './common/externalDocs';
import { groupPathsByTags } from './common/groupPathsByTags';
import { transformComponents } from './v3-3_1/components/components';
import { transformSecuritySchemes } from './v3-3_1/securitySchemes/securitySchemes';
import {
  collectTags,
  renderPathsByTags,
} from './common/pipeline';
import { transformServers } from './v3-3_1/servers';

export function transformSwaggerV3(
  inputDoc: OpenAPIV3.Document,
  options: Options,
): string {
  const md = Markdown.md();

  // Process info
  if (!options.skipInfo && 'info' in inputDoc) {
    md.line(transformInfo(inputDoc.info));
  }

  if ('servers' in inputDoc && inputDoc.servers) {
    md.line(transformServers(inputDoc.servers));
  }

  // Collect tags
  const tagsCollection = 'tags' in inputDoc
    ? collectTags(inputDoc.tags) : collectTags([]);

  if ('externalDocs' in inputDoc) {
    md.line(transformExternalDocs(inputDoc.externalDocs));
  }

  if (inputDoc.components && 'securitySchemes' in inputDoc.components) {
    const securitySchemesOutput = transformSecuritySchemes(inputDoc.components.securitySchemes);
    if (securitySchemesOutput != null) {
      md.line(securitySchemesOutput);
    }
  }

  // Process Paths
  if ('paths' in inputDoc) {
    const tagged = groupPathsByTags(inputDoc.paths, ALLOWED_METHODS_V3);

    renderPathsByTags(md, tagged, tagsCollection, (path) => (
      transformPath(path, inputDoc.paths[path])
    ));
  }

  // Models (components)
  if ('components' in inputDoc) {
    const componentsOutput = transformComponents(inputDoc.components);
    if (componentsOutput != null) {
      md.line(md.string().horizontalRule());
      md.line(componentsOutput);
    }
  }

  // Glue all pieces down
  return md.export();
}
