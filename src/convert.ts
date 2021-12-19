import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import markdownlint from 'markdownlint';
import markdownlintRuleHelpers from 'markdownlint-rule-helpers';
import { transformInfo } from './transformers/info';
import { transformPath } from './transformers/path';
import { transformSecurityDefinitions } from './transformers/securityDefinitions';
import { transformExternalDocs } from './transformers/externalDocs';
import { transformDefinition } from './transformers/definitions';
import markdownlintConfig from '../.markdownlint.json';

export interface Options {
  skipInfo?: boolean;
  output?: string;
  input: string;
}

// replace all $refs except model definitions as these have their own section in the doc
export function partiallyDereference(node, $refs?: any) {
  if (typeof node !== 'object') return node;
  const obj = {};
  // Issue related to babel (I beleive) as it won't build it when just spreading
  // eslint-disable-next-line prefer-object-spread
  const nodeAsObject = Object.assign({}, node);
  Object.entries(nodeAsObject).forEach((pair: [string, any]): void => {
    const [key, value] = pair;
    if (Array.isArray(value)) {
      obj[key] = value.map((item) => partiallyDereference(item, $refs));
    } else if (key === '$ref' && !value.startsWith('#/definitions/')) {
      partiallyDereference($refs.get(value), $refs);
    } else {
      obj[key] = partiallyDereference(value, $refs);
    }
  });
  return obj;
}

export function transfromSwagger(inputDoc, options: any = {}) {
  const document = [];

  // Collect parameters
  const parameters = 'parameters' in inputDoc ? inputDoc.parameters : {};

  // Process info
  if (!options.skipInfo && 'info' in inputDoc) {
    document.push(transformInfo(inputDoc.info));
  }

  if ('externalDocs' in inputDoc) {
    document.push(transformExternalDocs(inputDoc.externalDocs));
  }

  // Security definitions
  if ('securityDefinitions' in inputDoc) {
    document.push(transformSecurityDefinitions(inputDoc.securityDefinitions));
  } else if (inputDoc.components && inputDoc.components.securitySchemas) {
    document.push(transformSecurityDefinitions(inputDoc.components.securityDefinitions));
  }

  // Process Paths
  if ('paths' in inputDoc) {
    Object.keys(inputDoc.paths).forEach((path) => document.push(transformPath(
      path,
      inputDoc.paths[path],
      parameters,
    )));
  }

  // Models (definitions)
  if ('definitions' in inputDoc) {
    document.push(transformDefinition(inputDoc.definitions));
  } else if (inputDoc.components && inputDoc.components.schemas) {
    document.push(transformDefinition(inputDoc.components.schemas));
  }

  // Glue all pieces down
  const plainDocument = document.join('\n');

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

export async function transformFile(options: Options): Promise<string> {
  const swaggerParser = new SwaggerParser();
  const $refs = await swaggerParser.resolve(options.input);
  // return SwaggerParser.resolve(options.input).then(() => {
  const dereferencedSwagger = partiallyDereference(swaggerParser.api, $refs);
  const markdown = transfromSwagger(dereferencedSwagger, options);

  if (options.output) {
    fs.writeFileSync(options.output, markdown);
  }

  return markdown;
  // });
}
