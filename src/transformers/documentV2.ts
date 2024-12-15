import { OpenAPIV2 } from 'openapi-types';
import { ALLOWED_METHODS_V2, Options } from '../types';
import { transformInfo } from './common/v2-3/info';
import { transformPath } from './v2/path';
import { transformSecurityDefinitions } from './v2/securityDefinitions';
import { transformExternalDocs } from './common/v2-3/externalDocs';
import { transformDefinition } from './v2/definitions';
import { TagsCollection } from './common/Tags';
import { Markdown } from '../lib/markdown';
import { groupPathsByTags } from './common/v2-3/groupPathsByTags';
import { transformTag } from './common/v2-3/tag';
import { transformSchemes } from './v2/schemes';

export function transformSwaggerV2(
  inputDoc: OpenAPIV2.Document,
  options: Options,
): string {
  const md = Markdown.md();

  // Skip host, basePath, produces and consumes
  // those are used for the mock server and won't be rendered

  // Security and Responses are supposed to be dereferenced (?)
  // and shall not be present in the root namespace

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

  // Schemes
  if ('schemes' in inputDoc) {
    md.line(transformSchemes(inputDoc.schemes));
  }

  // Collect parameters
  const parameters: OpenAPIV2.ParametersDefinitionsObject = 'parameters' in inputDoc ? inputDoc.parameters : {};

  // Process Paths
  if ('paths' in inputDoc) {
    // Group paths by tag name
    const tagged = groupPathsByTags<OpenAPIV2.PathsObject>(
      inputDoc.paths,
      ALLOWED_METHODS_V2,
    );

    Object.keys(tagged).forEach((tagName) => {
      md.line(md.string().horizontalRule());
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
    md.line(md.string().horizontalRule());
    md.line(transformDefinition(inputDoc.definitions));
  // } else if (inputDoc.components && inputDoc.components.schemas) {
  //   document.push(transformDefinition(inputDoc.components.schemas));
  }

  // Glue all pieces down
  return md.export();
}
