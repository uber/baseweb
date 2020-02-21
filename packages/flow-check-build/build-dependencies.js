#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
const fs = require('fs');
const path = require('path');

const baseui = fs
  .readdirSync(path.resolve(__dirname, 'node_modules/baseui'))
  .filter(item => {
    const ignore = ['es', 'esm', 'a11y', 'helpers', 'utils', 'node_modules'];
    return !ignore.includes(item) && !item.includes('.');
  });

const imports = baseui
  .map((item, index) => {
    return `import * as $${index} from 'baseui/${item}';`;
  })
  .join('\n');

const source = `/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable */
${imports}
import * as baseui from 'baseui';
/* eslint-enable */
`;

fs.writeFileSync(path.resolve(__dirname, 'index.js'), source);
/* eslint-enable flowtype/require-valid-file-annotation */
