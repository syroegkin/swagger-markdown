const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const directory = path.join(__dirname, '..', 'examples');
fs.readdir(directory, (err, files) => {
  if (err) {
    console.log(`Unable to read directory: ${err}`);
    return;
  }
  files.forEach((filename) => {
    if (!filename.match(/\.yaml$/)) return;
    console.log(`Processing ${filename}`);
    execSync(`node src/index.js -i examples/${filename}`);
    console.log('Done\n');
  });
});
