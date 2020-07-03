const SwaggerParser = require('swagger-parser');
const fs = require('fs');

const transformInfo = require('./transformers/info');
const transformPath = require('./transformers/path');
const transformSecurityDefinitions = require('./transformers/securityDefinitions');
const transformExternalDocs = require('./transformers/externalDocs');
const transformDefinition = require('./transformers/definitions');

// replace all $refs except model definitions as these have their own section in the doc
function partiallyDereference(node, $refs) {
  if (typeof node !== 'object') return node;
  const obj = {};
  for (const [key, value] of Object.entries(node)) {
    if (Array.isArray(value)) {
      obj[key] = value.map(item => partiallyDereference(item, $refs));
    } else if (key === '$ref' && !value.startsWith('#/definitions/')) {
      return partiallyDereference($refs.get(value), $refs);
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

  return document.join('\n');
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
