const SwaggerParser = require('swagger-parser');
const fs = require('fs');
const markdownlint = require('markdownlint');
const markdownlintRuleHelpers = require('markdownlint-rule-helpers');

const transformInfo = require('./transformers/info');
const transformPath = require('./transformers/path');
const transformSecurityDefinitions = require('./transformers/securityDefinitions');
const transformExternalDocs = require('./transformers/externalDocs');
const transformDefinition = require('./transformers/definitions');
const markdownlintConfig = require('../.markdownlint.json');

// replace all $refs except model definitions as these have their own section in the doc
function partiallyDereference(node, $refs) {
  if (typeof node !== 'object') return node;
  const obj = {};
  // Issue related to babel (I beleive) as it won't build it when just spreading
  // eslint-disable-next-line prefer-object-spread
  const nodeAsObject = Object.assign({}, node);
  for (const [key, value] of Object.entries(nodeAsObject)) {
    if (Array.isArray(value)) {
      obj[key] = value.map(item => partiallyDereference(item, $refs));
    } else if (key === '$ref' && !value.startsWith('#/definitions/')) {
      return partiallyDereference({...{propRef:true}, ...$refs.get(value)}, $refs);
    } else {
      obj[key] = partiallyDereference(value, $refs);
    }
  }
  return obj;
}

function transformSwagger(inputDoc, options = {}) {
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
    Object.keys(inputDoc.paths).forEach(path => document.push(transformPath(
        path,
        inputDoc.paths[path],
        parameters
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
  const fixes = fixResults.plainDocument.filter(error => error.fixInfo);
  if (fixes.length > 0) {
    return markdownlintRuleHelpers.applyFixes(plainDocument, fixes);
  }

  return plainDocument;
}

function transformFile(options) {
  const swaggerParser = new SwaggerParser();
  return swaggerParser.resolve(options.input).then(() => {
    const dereferencedSwagger = partiallyDereference(swaggerParser.api, swaggerParser.$refs);
    const markdown = transformSwagger(dereferencedSwagger, options);

    if (options.output) {
      fs.writeFileSync(options.output, markdown);
    }

    return markdown;
  });
}

module.exports = {
  transformFile,
  transformSwagger,
  partiallyDereference,
};
