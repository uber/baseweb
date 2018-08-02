// @flow
import fs from 'fs';
import path from 'path';

/*
We can consider this as well:
https://github.com/RichieAHB/rollup-plugin-flow-defs/blob/master/src/index.js
This code is inspired by that npm package anyway.

The reason why we don't use that is because:
* Package depends on `mkdirp`. It's just one dependency, but it's an extra dep for such a simple thing to do.
* We cannot override the output path for the flow entry file content

Hence, it's easier to write our own so we can do full modifications as needed.
 */

function getFlowFileContent(filePath) {
  /*
  Since we're running this during rollup process, it will be relative to the main `src` directory.
  We do not want that.
  We want to make it point to the `src` directory that will be created with our scripts later in the build process
  from `flow-copy-src.js`.

  Hence, instead of `../src` and `../../src`, they will become `./src` and `../src` respectively.
  */

  // Find `../` pattern in the `filePath`
  const regex = new RegExp(/\.\.\//, 'g');
  // We want to know how many `../` is inside the file path
  const matched = filePath.match(regex);
  if (matched && matched.length > 0) {
    // Check whether it's only one `../`
    if (matched.length === 1) {
      // Only 1, replace it with `./`
      filePath = filePath.replace('../', './');
    } else {
      // Must be more than 1, then just remove one `../`
      filePath = filePath.replace('../', '');
    }
  }
  // Remove the `.js` extension, if any, so that it could point to `.js.flow` automatically
  filePath = filePath.replace('.js', '');
  return `// @flow
export * from '${filePath}';`;
}

export default function flowEntry() {
  let input;
  return {
    name: 'rollup-plugin-flow-entry',
    // $FlowFixMe can't have annotations here since it's for rollup
    options(opts) {
      input = opts.input;
    },
    // $FlowFixMe can't have annotations here since it's for rollup
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
