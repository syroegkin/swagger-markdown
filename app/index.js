#! /usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const ArgumentParser = require('argparse').ArgumentParser;
const transformInfo = require('./transformers/info');
const transformPath = require('./transformers/path');

const parser = new ArgumentParser({
  addHelp: true,
  description: 'swagger-markdown'
});

parser.addArgument(
  ['-i'], {
    help: 'Path to the swagger yaml file'
  }
);
// parser.addArgument(
//   ['-o'], {
//     help: 'Path to the result markdown file.'
//   }
// );
const args = parser.parseArgs();

if (args.i) {
  const document = [];

  try {
    const doc = yaml.safeLoad(fs.readFileSync(args.i, 'utf8'));

    // Process info
    if ('info' in doc) {
      document.push(transformInfo(doc.info));
    }

    // Process Paths
    if ('paths' in doc) {
      Object.keys(doc.paths).map(path => document.push(transformPath(path, doc.paths[path])));
    }

    fs.writeFile(args.i.replace(/yaml$/, 'md'), document.join('\n'), err => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
