/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/*eslint-env node*/

const mkdirp = require('mkdirp');

jest.setTimeout(10 * 1000);
jest.retryTimes(10);

global.it = async function(name, func, timeout) {
  return await test(
    name,
    async () => {
      try {
        await func();
      } catch (e) {
        mkdirp.sync('__artifacts__');
        try {
          await page.screenshot({
            type: 'png',
            path: `__artifacts__/${name}.png`,
          });
        } catch (er) {
          console.log('There was an issue taking a test failure screenshot.');
          console.log(er);
        }
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
