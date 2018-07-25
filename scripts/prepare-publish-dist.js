/* eslint-disable flowtype/require-valid-file-annotation */
/*
In order to support `import {Input} from @uber/baseui/input` we need to have a flat directory.
But it's not pretty if we have everything in root.
So, one trick to do it is to create a file `input.js` in the root that import the dist directory.
Like a mapping.
 */
const fs = require('fs');

const util = require('./util');

function transformPath(indexToPointPath) {
  if (indexToPointPath.indexOf('..') !== 0) {
    // We need to add `./`
    indexToPointPath = `./${indexToPointPath}`;
  }
  return indexToPointPath;
}

function writeFileToRoot(outputFilePath, indexToPointPath) {
  fs.writeFileSync(
    outputFilePath,
    `module.exports = require('${transformPath(indexToPointPath)}');\n`,
  );
}

const dirContentList = fs.readdirSync('dist');
dirContentList.forEach(name => {
  const distPath = `dist/${name}`;
  const stats = fs.statSync(distPath);
  const relativePath = util.getRelativePath(distPath, '');
  if (stats.isDirectory()) {
    /*
    We only care about directories
     */
    writeFileToRoot(`${name}.js`, relativePath);
  }
});
