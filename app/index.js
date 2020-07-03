#! /usr/bin/env node

const { ArgumentParser, Action } = require('argparse');
const packageInfo = require('../package.json');
const { transformFile } = require('./convert');

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
  if (!args.output) {
    args.output = args.input.replace(/(yaml|yml|json)$/i, 'md');
  }
  transformFile(args).catch(err => console.error(err));
}
