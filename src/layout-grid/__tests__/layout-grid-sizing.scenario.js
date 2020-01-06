/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {
  Unstable_Grid as Grid,
  Unstable_Cell as Cell,
  BEHAVIOR,
} from '../index.js';
import Inner from './inner.js';

export const name = 'layout-grid-sizing';

export function component() {
  return (
    <>
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>
          <Inner>1</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid behavior={BEHAVIOR.fluid}>
        <Cell span={12}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
    </>
  );
}
