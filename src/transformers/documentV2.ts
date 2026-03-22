import { OpenAPIV2 } from 'openapi-types';
import { ALLOWED_METHODS_V2, Options } from '../types';
import { transformInfo } from './common/info';
import { transformPath } from './v2/path';
import { transformSecurityDefinitions } from './v2/securityDefinitions';
import { transformExternalDocs } from './common/externalDocs';
import { transformDefinition } from './v2/definitions';
import { Markdown } from '../lib/markdown';
import { groupPathsByTags } from './common/groupPathsByTags';
import { transformSchemes } from './v2/schemes';
import {
  collectTags,
  renderPathsByTags,
} from './common/pipeline';

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
  const tagsCollection = 'tags' in inputDoc
    ? collectTags(inputDoc.tags) : collectTags([]);

  if ('externalDocs' in inputDoc) {
    md.line(transformExternalDocs(inputDoc.externalDocs));
  }

  // Security definitions
  if ('securityDefinitions' in inputDoc) {
    md.line(transformSecurityDefinitions(inputDoc.securityDefinitions));
  }

  // Schemes
  if ('schemes' in inputDoc) {
    md.line(transformSchemes(inputDoc.schemes));
  }

  // Collect parameters
  const parameters: OpenAPIV2.ParametersDefinitionsObject = 'parameters' in inputDoc ? inputDoc.parameters : {};

  // Process Paths
  if ('paths' in inputDoc) {
    const tagged = groupPathsByTags<OpenAPIV2.PathsObject>(
      inputDoc.paths,
      ALLOWED_METHODS_V2,
    );

    renderPathsByTags(md, tagged, tagsCollection, (path) => transformPath(
      path,
      inputDoc.paths[path],
      parameters,
    ));
  }

  // Models (definitions)
  if ('definitions' in inputDoc) {
    md.line(md.string().horizontalRule());
    md.line(transformDefinition(inputDoc.definitions));
  }

  // Glue all pieces down
  return md.export();
}
