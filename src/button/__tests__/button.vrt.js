/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

it('button', async () => {
  await mount(page, 'button');
  const root = await page.$('#root');

  // freeze animations
  await page.addStyleTag({
    content: `*, *::before, *::after {
      -moz-transition: none !important;
      transition: none !important;
      -moz-animation: none !important;
      animation: none !important;
     }`,
  });

  // take a screenshot
  let image = await root.screenshot();
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: function({currentTestName}) {
      return currentTestName;
    },
  });

  // hover over a button
  await page.hover('button');

  // take a screenshot
  image = await root.screenshot();
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: function({currentTestName}) {
      return `${currentTestName}-hover`;
    },
  });
});
