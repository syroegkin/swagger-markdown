import path from 'path';
import fs from 'fs';
import { execFileSync } from 'child_process';

const examplesDirectory = path.join(__dirname, '..', 'examples');

// Read all subdirectories
const subdirectories = fs.readdirSync(examplesDirectory, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

subdirectories.forEach((subdirectory) => {
  const subdirectoryPath = path.join(examplesDirectory, subdirectory);

  // Read all files in the subdirectory
  const files = fs.readdirSync(subdirectoryPath);
  files.forEach((filename) => {
    if (!filename.match(/\.yaml$/)) return;

    console.log(`Processing ${filename} in ${subdirectory}`);
    try {
      execFileSync('node', ['dist/swagger-markdown.js', '-i', `examples/${subdirectory}/${filename}`]);
      console.log('Done\n');
    } catch (e) {
      console.log(e);
      console.log(Buffer.from(e.stdout).toString('utf-8'));
    }
  });
});
