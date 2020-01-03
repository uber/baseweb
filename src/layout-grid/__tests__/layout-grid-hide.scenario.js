/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Unstable_Grid as Grid, Unstable_Cell as Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'layout-grid-hide';

export function component() {
  return (
    <>
      <Grid>
        <Cell span={[2, 4]}>
          <Inner>1A</Inner>
        </Cell>
        <Cell span={[0, 1]}>
          <Inner>1B</Inner>
        </Cell>
      </Grid>
    </>
  );
}
