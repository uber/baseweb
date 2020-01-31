/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */
/* eslint-disable flowtype/require-valid-file-annotation */

const path = require('path');
const glob = require('glob');

// from https://github.com/terpiljenya/import-glob/blob/master/index.js
function scenarioloader(source) {
  this.cacheable();
  var regex = /.?import + ?((\w+) +from )?(['"])(.*?)\3/gm;
  var resourceDir = path.dirname(this.resourcePath);
  function replacer(match, fromStatement, obj, quote, filename) {
    if (!glob.hasMagic(filename)) return match;

    const files = glob.sync(filename, {cwd: resourceDir});

    const metadata = files.map(function(file, index) {
      const fileName = quote + file + quote;
      const moduleName = obj + index;
      return {fileName, moduleName};
    });

    const metadataToImportStatement = data =>
      `import * as ${data.moduleName} from ${data.fileName};\n`;
    const metadataToString = data =>
      `{fileName: ${data.fileName}, result: ${data.moduleName}},\n`;

    let result = metadata.map(metadataToImportStatement).join('');
    result += `const ${obj} = [${metadata.map(metadataToString)}]`;

    return result;
  }
  var res = source.replace(regex, replacer);
  return res;
}

module.exports = scenarioloader;
