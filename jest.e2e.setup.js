/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/*eslint-env node*/

const mkdirp = require('mkdirp');

global.it = async function(name, func, timeout) {
  return await test(
    name,
    async () => {
      try {
        await func();
      } catch (e) {
        mkdirp.sync('__artifacts__');
        await page.screenshot({path: `__artifacts__/${name}.png`});
        if (process.env.CI) {
          console.log(
            `\u001B]1338;url="artifact://__artifacts__/${name}.png";alt="Screenshot"\u0007`,
          );
        }
        throw e;
      }
    },
    timeout,
  );
};
