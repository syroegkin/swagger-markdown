import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const directory = path.join(__dirname, '..', 'examples');

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(`Unable to read directory: ${err}`);
    return;
  }
  files.forEach((filename) => {
    if (!filename.match(/\.yaml$/)) return;
    console.log(`Processing ${filename}`);
    try {
      execSync(`node dist/swagger-markdown.js -i examples/${filename}`);
      console.log('Done\n');
    } catch (e) {
      console.log(e);
      console.log(Buffer.from(e.stdout).toString('utf-8'));
    }
  });
});
