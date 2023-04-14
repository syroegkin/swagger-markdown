import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import markdownlint from 'markdownlint';
import markdownlintRuleHelpers from 'markdownlint-rule-helpers';
import { OpenAPIV2 } from 'openapi-types';
import { AllSwaggerDocumentVersions, Options } from './types';
import { isV2Document, isV31Document, isV3Document } from './lib/detectDocumentVersion';
import { transformSwaggerV2 } from './transformers/documentV2';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const markdownlintConfig = require('../.markdownlint.json');

/**
 * Replace all $refs with their values,
 * except model definitions as these have their own section in the result md document
 *
 * @export
 * @param {AllSwaggerDocumentVersions} node
 * @param {SwaggerParser.$Refs} [$refs]
 * @return {*}  {AllSwaggerDocumentVersions}
 */
export function partiallyDereference(
  node: AllSwaggerDocumentVersions,
  $refs?: SwaggerParser.$Refs,
): AllSwaggerDocumentVersions {
  if (typeof node !== 'object') return node;
  const obj = {} as AllSwaggerDocumentVersions;
  const entries = Object.entries(node);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (Array.isArray(value)) {
      obj[key] = value.map((item) => partiallyDereference(item, $refs));
    } else if (key === '$ref' && !value.startsWith('#/definitions/')) {
      return partiallyDereference($refs.get(value), $refs);
    } else {
      obj[key] = partiallyDereference(value, $refs);
    }
  }
  return obj;
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
    // Will be removed as soon as support of version 3 will be in place
    plainDocument = transformSwaggerV2(inputDoc as OpenAPIV2.Document, options);
  } else if (isV3Document(inputDoc)) {
    throw new Error('OpenAPI V3 is not yet supported');
  } else if (isV31Document(inputDoc)) {
    throw new Error('OpenAPI V3.1 is not yet supported');
  } else {
    throw new Error('Can not detect version ot this version in not supported');
  }

  // Fix markdown issues
  const fixOptions = {
    resultVersion: 3,
    strings: { plainDocument },
    config: markdownlintConfig,
  };
  const fixResults = markdownlint.sync(fixOptions);
  const fixes = fixResults.plainDocument.filter((error) => error.fixInfo);
  if (fixes.length > 0) {
    return markdownlintRuleHelpers.applyFixes(plainDocument, fixes);
  }

  return plainDocument;
}

/**
 * @export
 * @param {Options} options
 * @return {*}  {Promise<string>}
 */
export async function transformFile(options: Options): Promise<string> {
  const swaggerParser = new SwaggerParser();
  const bundle = await swaggerParser.bundle(options.input);
  const $refs: SwaggerParser.$Refs = await swaggerParser.resolve(bundle);
  const dereferencedDocument = partiallyDereference(swaggerParser.api, $refs);
  const markdown = transfromSwagger(dereferencedDocument, options);

  if (options.output) {
    fs.writeFileSync(options.output, markdown);
  }

  return markdown;
}
