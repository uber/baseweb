/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {argv} from 'yargs';
import {Stepper, step} from '@dubstep/core';

import styledV7FlowFixMe from './styled-flowfixme.js';
import styledV8ToThemedStyled from './styled-v8-themedStyled.js';

let dir = argv.dir;

if (!dir) {
  throw new Error(
    'Must specify a directory with the --dir argument. ex: --test=src',
  );
}

// terminal auto-completes directories with a '/' suffix
if (dir[dir.length - 1] === '/') {
  dir = dir.substring(0, dir.length - 1);
}

const steps = [
  step(
    'apply flowfixme to baseui styled calls without type definitions',
    async () => {
      await styledV7FlowFixMe({dir});
    },
  ),
  step('migrate styled theme generic to createThemedStyled', async () => {
    await styledV8ToThemedStyled({dir});
  }),
];

const stepper = new Stepper(steps);
stepper.run();
