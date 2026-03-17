/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import { ALLOWED_METHODS_V3, Options } from '../types';
import { transformInfo } from './common/info';
import { transformPath } from './v3-3_1/path';
import { Markdown } from '../lib/markdown';
import { TagsCollection } from './common/Tags';
import { transformExternalDocs } from './common/externalDocs';
import { transformTag } from './common/tag';
import { groupPathsByTags } from './common/groupPathsByTags';
import { transformComponents } from './v3-3_1/components/components';
import { transformSecuritySchemes } from './v3-3_1/securitySchemes/securitySchemes';

export function transformSwaggerV3_1(
  inputDoc: OpenAPIV3_1.Document,
  options: Options,
): string {
  const md = Markdown.md();

  if (!options.skipInfo && 'info' in inputDoc) {
    md.line(transformInfo(inputDoc.info));
  }

  const tagsCollection = new TagsCollection();
  if ('tags' in inputDoc) {
    inputDoc.tags.forEach((tag) => {
      tagsCollection.tag(tag);
    });
  }

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

    Object.keys(tagged).forEach((tagName) => {
      md.line(md.string().horizontalRule());
      if (tagsCollection.length) {
        const tagObject = tagsCollection.getTag(tagName) || '';
        md.line(transformTag(tagObject));
      }
      const pathsUnderTag = tagged[tagName];
      Object.keys(pathsUnderTag).forEach((path: string) => md.line(
        transformPath(path, inputDoc.paths[path]),
      ));
    });
  }

  // Webhooks section added in Step 4

  if ('components' in inputDoc) {
    const componentsOutput = transformComponents(inputDoc.components);
    if (componentsOutput != null) {
      md.line(md.string().horizontalRule());
      md.line(componentsOutput);
    }
  }

  return md.export();
}
