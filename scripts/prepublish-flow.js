/* eslint-disable flowtype/require-valid-file-annotation */
const path = require('path');
const fs = require('fs');

function getNewFileContent(fileContent) {
  /*
  Since we're going to copy `dist` dictionary into root in our publish step,
  we will need to remove one level of the path.
  Hence, instead of `../src` and `../../src`, they will become `./src` and `../src` respectively.
   */

  // Remove one level if exists (check for `../`)
  const regex = new RegExp(/\.\.\//, 'g');
  const matched = fileContent.match(regex);
  if (matched.length > 0) {
    // Check whether it's only one `..`
    if (matched.length === 1) {
      // Only 1, replace it with `./`
      fileContent = fileContent.replace('../', './');
    } else {
      // Must be more than 1
      fileContent = fileContent.replace('../', '');
    }
  }
  return fileContent;
}

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    return;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); // recurse
    } else if (filename.indexOf(filter) >= 0) {
      const contents = fs.readFileSync(filename, 'utf8');
      const newFileContent = getNewFileContent(contents);
      fs.writeFileSync(filename, newFileContent);
    }
  }
}

fromDir(`${__dirname}/../dist`, '.js.flow');
