#! /usr/bin/env node
'use strict';

var yaml = require('js-yaml');
var fs = require('fs');
var ArgumentParser = require('argparse').ArgumentParser;
var transformInfo = require('./transformers/info');
var transformPath = require('./transformers/path');
var transformSecurityDefinitions = require('./transformers/securityDefinitions');
var transformExternalDocs = require('./transformers/externalDocs');
var transformDefinition = require('./transformers/definitions');
var packageInfo = require('../package.json');

var parser = new ArgumentParser({
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
var args = parser.parseArgs();

if (args.input) {
  var document = [];

  try {
    var inputDoc = yaml.safeLoad(fs.readFileSync(args.input, 'utf8'));
    var outputFile = args.output || args.input.replace(/(yaml|json)$/i, 'md');

    // Collect parameters
    var parameters = 'parameters' in inputDoc ? inputDoc.parameters : {};

    // Process info
    if ('info' in inputDoc) {
      document.push(transformInfo(inputDoc.info));
    }

    if ('externalDocs' in inputDoc) {
      document.push(transformExternalDocs(inputDoc.externalDocs));
    }

    // Security definitions
    if ('securityDefinitions' in inputDoc) {
      document.push(transformSecurityDefinitions(inputDoc.securityDefinitions));
    }

    // Process Paths
    if ('paths' in inputDoc) {
      Object.keys(inputDoc.paths).map(function (path) {
        return document.push(transformPath(path, inputDoc.paths[path], parameters));
      });
    }

    // Models (definitions)
    if ('definitions' in inputDoc) {
      document.push(transformDefinition(inputDoc.definitions));
    }

    fs.writeFile(outputFile, document.join('\n'), function (err) {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
}