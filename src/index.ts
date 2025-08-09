import SwaggerParser from '@apidevtools/swagger-parser';
import type { $Refs } from '@apidevtools/json-schema-ref-parser';
import fs from 'fs';
import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { AllSwaggerDocumentVersions, Options } from './types';
import { isV2Document, isV31Document, isV3Document } from './lib/detectDocumentVersion';
import { transformSwaggerV2 } from './transformers/documentV2';
import { transformSwaggerV3 } from './transformers/documentV3';

/**
 * Replace all $refs with their values,
 * except model definitions as these have their own section in the result md document
 *
 * @export
 * @param {AllSwaggerDocumentVersions} node
 * @param {$Refs} [$refs]
 * @return {*}  {AllSwaggerDocumentVersions}
 */
export function partiallyDereference(
  node: AllSwaggerDocumentVersions,
  $refs?: $Refs,
): AllSwaggerDocumentVersions {
  if (typeof node !== 'object') return node;
  const obj = {} as AllSwaggerDocumentVersions;
  const entries = Object.entries(node);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (Array.isArray(value)) {
      obj[key] = value.map((item) => partiallyDereference(item, $refs));
    } else if (
      key === '$ref'
      && !value.startsWith('#/definitions/') // V2
      && !value.startsWith('#/components/schemas') // V3
    ) {
      return partiallyDereference($refs.get(value) as unknown as AllSwaggerDocumentVersions, $refs);
    } else {
      obj[key] = partiallyDereference(value, $refs);
    }
  }
  return obj;
}

/**
 * Tidy up markdown
 *
 * @export
 * @param {string} markdown
 * @return {*}  {string}
 */
export function tidyMarkdown(markdown: string): string {
  // Remove newlines at the end of the file
  markdown = markdown.replace(/\n+$/, '');
  // Add newline at the end of the file if it does not have one
  if (!markdown.endsWith('\n')) {
    markdown += '\n';
  }
  // Remove duplicate newlines
  markdown = markdown.replace(/\n{2,}/g, '\n\n');
  return markdown;
}

/**
 * Check version of the document,
 * run appropriate processor and beautify the markdown after processing.
 *
 * @export
 * @param {AllSwaggerDocumentVersions} inputDoc
 * @param {Options} options
 * @return {*}  {string}
 */
export function transfromSwagger(inputDoc: AllSwaggerDocumentVersions, options: Options): string {
  let plainDocument = '';

  if (isV2Document(inputDoc) || options.forceVersion === '2') {
    // Quick hack to allow version 3 to be processed as it version 2
    // Will be removed as soon as support of version 3 will be in place`
    plainDocument = transformSwaggerV2(inputDoc as OpenAPIV2.Document, options);
  } else if (isV3Document(inputDoc) || options.forceVersion === '3') {
    plainDocument = transformSwaggerV3(inputDoc as OpenAPIV3.Document, options);
  } else if (isV31Document(inputDoc)) {
    throw new Error('OpenAPI V3.1 is not yet supported');
  } else {
    throw new Error('Can not detect version ot this version in not supported');
  }

  return tidyMarkdown(plainDocument);
}

/**
 * @export
 * @param {Options} options
 * @return {*}  {Promise<string>}
 */
export async function transformFile(options: Options): Promise<string> {
  const swaggerParser = new SwaggerParser();
  const bundle = await swaggerParser.bundle(options.input);
  const $refs: $Refs = await swaggerParser.resolve(bundle);
  const dereferencedDocument = partiallyDereference(swaggerParser.api, $refs);
  const markdown = transfromSwagger(dereferencedDocument, options);

  if (options.output) {
    fs.writeFileSync(options.output, markdown);
  }

  return markdown;
}
