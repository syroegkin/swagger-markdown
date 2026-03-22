import { OpenAPIV3_1 } from 'openapi-types';
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

export function transformSwaggerV3_1(
  inputDoc: OpenAPIV3_1.Document,
  options: Options,
): string {
  const md = Markdown.md();

  if (!options.skipInfo && 'info' in inputDoc) {
    md.line(transformInfo(inputDoc.info));
  }

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

  if ('paths' in inputDoc && inputDoc.paths) {
    const tagged = groupPathsByTags(inputDoc.paths, ALLOWED_METHODS_V3);

    renderPathsByTags(md, tagged, tagsCollection, (path) => (
      transformPath(path, inputDoc.paths[path])
    ));
  }

  if ('webhooks' in inputDoc && inputDoc.webhooks && Object.keys(inputDoc.webhooks).length > 0) {
    md.line(md.string().horizontalRule());
    md.line(md.string('Webhooks').h3());
    md.line('');
    Object.keys(inputDoc.webhooks).forEach((webhookName) => {
      const pathItem = inputDoc.webhooks[webhookName];
      const webhookOutput = transformPath(webhookName, pathItem as unknown);
      if (webhookOutput != null) {
        md.line(webhookOutput);
      }
    });
  }

  if ('components' in inputDoc) {
    const componentsOutput = transformComponents(inputDoc.components);
    if (componentsOutput != null) {
      md.line(md.string().horizontalRule());
      md.line(componentsOutput);
    }
  }

  return md.export();
}
