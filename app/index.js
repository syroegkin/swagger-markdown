#! /usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const { ArgumentParser, Action } = require('argparse');
const transformInfo = require('./transformers/info');
const transformPath = require('./transformers/path');
const transformSecurityDefinitions = require('./transformers/securityDefinitions');
const transformExternalDocs = require('./transformers/externalDocs');
const transformDefinition = require('./transformers/definitions');
const packageInfo = require('../package.json');

const parser = new ArgumentParser({
  addHelp: true,
  description: 'swagger-markdown',
  version: packageInfo.version
});

parser.addArgument(['-i', '--input'], {
  required: true,
  help: 'Path to the swagger yaml file',
  metavar: '',
  dest: 'input'
});
parser.addArgument(['-o', '--output'], {
  help: 'Path to the resulting md file',
  metavar: '',
  dest: 'output'
});
parser.addArgument(['--skip-info'], {
  action: Action.storeTrue,
  nargs: 0,
  help: 'Skip the title, description, version etc, whatever is in the info block.',
  metavar: '',
  dest: 'skipInfo'
});
const args = parser.parseArgs();

if (args.input) {
  const document = [];

  try {
    const inputDoc = yaml.safeLoad(fs.readFileSync(args.input, 'utf8'));
    const outputFile = args.output || args.input.replace(/(yaml|yml|json)$/i, 'md');

    // Collect parameters
    const parameters = ('parameters' in inputDoc) ? inputDoc.parameters : {};

    // Process info
    if (!args.skipInfo && ('info' in inputDoc)) {
      document.push(transformInfo(inputDoc.info));
    }

    if ('externalDocs' in inputDoc) {
      document.push(transformExternalDocs(inputDoc.externalDocs));
    }

    // Security definitions
    if ('securityDefinitions' in inputDoc) {
      document.push(transformSecurityDefinitions(inputDoc.securityDefinitions));
    }
    else if(inputDoc.components && inputDoc.components.securitySchemas) {
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
    } else if(inputDoc.components && inputDoc.components.schemas) {
      document.push(transformDefinition(inputDoc.components.schemas));
    }

    fs.writeFile(outputFile, document.join('\n'), err => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
