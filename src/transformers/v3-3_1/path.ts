import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { Markdown } from '../../lib/markdown';
import {
  ALLOWED_METHODS_V3,
  Dereferenced,
} from '../../types';
import { transformExternalDocs } from '../common/externalDocs';
import { transformSecurity } from '../common/security';
import { transformResponses } from './pathResponses';
import { transformParameters } from './pathParameters';
import { transformRequestBody } from './pathRequestBody';

export type PathItemLike =
  | OpenAPIV3.PathItemObject
  | OpenAPIV3_1.PathItemObject
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.ReferenceObject;

type OperationObject = OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject;
type ParameterObject = OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;

export function appendMethodHeader(
  md: Markdown,
  method: string,
  path: string,
  deprecated: boolean,
): void {
  md.line('');
  const header = md.string(`[${method.toUpperCase()}] ${path}`);
  if (deprecated) {
    header.strikethrough();
  }
  header.h3();
  md.line(header);

  if (deprecated) {
    md.line().line(md.string('DEPRECATED').bold().italic()).line();
  }
}

export function appendOperationDetails(
  md: Markdown,
  pathInfo: OperationObject,
): void {
  if ('summary' in pathInfo) {
    md.line(md.string(pathInfo.summary).escape().bold()).line();
  }

  if ('description' in pathInfo && pathInfo.summary !== pathInfo.description) {
    md.line(md.string(pathInfo.description).escape()).line();
  }

  // operationId is intentionally not rendered — it is tooling metadata (codegen, linking),
  // not useful for documentation readers.

  if ('externalDocs' in pathInfo) {
    md.line(
      md.string('Documentation:').bold(),
      md.string(' '),
      transformExternalDocs(pathInfo.externalDocs),
    );
  }
}

function appendSection(md: Markdown, content: string): void {
  const section = md.string(content);
  if (section.length) {
    md.line(section).line();
  }
}

export function appendOperationSections(
  md: Markdown,
  pathInfo: OperationObject,
  pathParameters: ParameterObject[],
): void {
  if ('parameters' in pathInfo || pathParameters) {
    appendSection(md, transformParameters(
      pathInfo.parameters as Dereferenced<typeof pathInfo.parameters>,
      pathParameters,
    ));
  }

  if ('requestBody' in pathInfo && pathInfo.requestBody) {
    const requestBody = pathInfo.requestBody as Dereferenced<typeof pathInfo.requestBody>;
    if (requestBody) {
      appendSection(md, transformRequestBody(requestBody));
    }
  }

  if ('responses' in pathInfo) {
    appendSection(md, transformResponses(pathInfo.responses));
  }

  if ('security' in pathInfo) {
    md.line(transformSecurity(pathInfo.security));
  }
}

export function transformPath(
  path: string,
  data: PathItemLike,
): string | null {
  let pathParameters: ParameterObject[] = [];

  if (!path || !data) {
    return null;
  }
  if ('$ref' in data && data.$ref) {
    return null;
  }

  const pathItem = data as OpenAPIV3.PathItemObject | OpenAPIV3_1.PathItemObject;
  const md = Markdown.md();

  if ('parameters' in pathItem) {
    pathParameters = pathItem.parameters as Dereferenced<typeof pathItem.parameters>;
  }

  Object.keys(pathItem).forEach((method) => {
    if (ALLOWED_METHODS_V3.includes(method)) {
      const pathInfo: OperationObject = pathItem[method];
      const deprecated = 'deprecated' in pathInfo && pathInfo.deprecated === true;

      appendMethodHeader(md, method, path, deprecated);
      appendOperationDetails(md, pathInfo);
      appendOperationSections(md, pathInfo, pathParameters);
    }
  });

  return md.export();
}
