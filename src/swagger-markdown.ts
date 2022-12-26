import { ArgumentParser } from 'argparse';
import { transformFile } from './index';
import { Options } from './types';
import packageInfo = require('../package.json');

const parser = new ArgumentParser({
  description: packageInfo.name,
  add_help: true,
});

parser.add_argument('-v', '--version', {
  action: 'version',
  version: packageInfo.version,
});
parser.add_argument('-i', '--input', {
  required: true,
  help: 'Path to the swagger yaml file',
  metavar: '',
  dest: 'input',
});
parser.add_argument('-o', '--output', {
  help: 'Path to the resulting md file',
  metavar: '',
  dest: 'output',
});
parser.add_argument('--skip-info', {
  action: 'store_true',
  help: 'Skip the title, description, version etc, whatever is in the info block.',
  dest: 'skipInfo',
});
const args: Options = parser.parse_args();

if (args.input) {
  if (!args.output) {
    args.output = args.input.replace(/(yaml|yml|json)$/i, 'md');
  }
  transformFile(args).catch((err) => console.error(err));
}
