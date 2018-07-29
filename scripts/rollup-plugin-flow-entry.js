/* eslint-disable flowtype/require-valid-file-annotation */
import fs from 'fs';
import path from 'path';

/*
We can consider this as well:
https://github.com/RichieAHB/rollup-plugin-flow-defs/blob/master/src/index.js

This code is inspired by that npm package anyway.
 */

function getFlowFileContent(filePath) {
  const regex = new RegExp(/\.\.\//, 'g');
  const matched = filePath.match(regex);
  if (matched.length > 0) {
    // Check whether it's only one `..`
    if (matched.length === 1) {
      // Only 1, replace it with `./`
      filePath = filePath.replace('../', './');
    } else {
      // Must be more than 1
      filePath = filePath.replace('../', '');
    }
  }
  return `// @flow
// $FlowFixMe path is assuming that it's already in root directory
export * from '${filePath}';`;
}

export default function uberFlowEntry() {
  let input;
  return {
    name: '@uber/rollup-plugin-flow-entry',
    options(opts) {
      input = opts.input;
    },
    async generateBundle(opts) {
      const {file = ''} = opts || {};

      // Create file path if does not exist
      await new Promise(resolve => {
        const dirname = path.dirname(file);
        if (!fs.existsSync(dirname)) {
          fs.mkdirSync(dirname);
        }
        resolve('ok');
      });

      await new Promise((resolve, reject) => {
        /*
        path.dirname(input); // src/components/popover
        path.basename(input); // index.js
        path.dirname(file); // this is output, `dist/popover`
         */
        const relativePath = path.join(
          path.relative(path.dirname(file), path.dirname(input)),
          path.basename(input),
        );
        fs.writeFile(`${file}.flow`, getFlowFileContent(relativePath), err => {
          if (err) {
            reject(err);
          }
          resolve('ok');
        });
      });
    },
  };
}
