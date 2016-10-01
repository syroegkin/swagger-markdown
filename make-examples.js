const exec = require('child_process').exec;

const files = [
  'basic-auth.yaml',
  'default.yaml',
  'echo.yaml',
  'heroku-pets.yaml',
  'instagram.yaml',
  'minimal.yaml',
  'petstore_full.yaml',
  'petstore_simple.yaml',
  'security.yaml'
];

files.map(filename => exec(`node app/index.js -i examples/${filename}`));
