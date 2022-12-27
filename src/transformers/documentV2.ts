import { OpenAPIV2 } from 'openapi-types';
import { Options } from '../types';
import { transformInfo } from './info';
import { transformPath } from './path';
import { transformSecurityDefinitions } from './securityDefinitions';
import { transformExternalDocs } from './externalDocs';
import { transformDefinition } from './definitions';
import { TagsCollection } from '../models/Tags';
import { Markdown } from '../lib/markdown';
import { groupPathsByTags } from './groupPathsByTags';
import { transformTag } from './tag';

export function transformSwaggerV2(
  inputDoc: OpenAPIV2.Document,
  options: Options,
): string {
  const md = Markdown.md();

  // Process info
  if (!options.skipInfo && 'info' in inputDoc) {
    md.line(transformInfo(inputDoc.info));
  }

  // Collect tags
  const tagsCollection = new TagsCollection();
  if ('tags' in inputDoc) {
    inputDoc.tags.forEach((tag) => {
      tagsCollection.tag(tag);
    });
  }

  if ('externalDocs' in inputDoc) {
    md.line(transformExternalDocs(inputDoc.externalDocs));
  }

  // Security definitions
  if ('securityDefinitions' in inputDoc) {
    md.line(transformSecurityDefinitions(inputDoc.securityDefinitions));
  // } else if (inputDoc.components && inputDoc.components.securitySchemas) {
  //   document.push(transformSecurityDefinitions(inputDoc.components.securityDefinitions));
  }

  // Collect parameters
  const parameters = 'parameters' in inputDoc ? inputDoc.parameters : {};

  // Process Paths
  if ('paths' in inputDoc) {
    // Group paths by tag name
    const tagged = groupPathsByTags(inputDoc.paths);

    Object.keys(tagged).forEach((tagName) => {
      if (tagsCollection.length) {
        // Display Tag
        const tagObject = tagsCollection.getTag(tagName) || '';
        md.line(transformTag(tagObject));
      }
      const pathsUnderTag = tagged[tagName];
      Object.keys(pathsUnderTag).forEach((path: string) => md.line(transformPath(
        path,
        inputDoc.paths[path],
        parameters,
      )));
    });
  }

  // Models (definitions)
  if ('definitions' in inputDoc) {
    md.line(transformDefinition(inputDoc.definitions));
  // } else if (inputDoc.components && inputDoc.components.schemas) {
  //   document.push(transformDefinition(inputDoc.components.schemas));
  }

  // Glue all pieces down
  return md.export();
}
