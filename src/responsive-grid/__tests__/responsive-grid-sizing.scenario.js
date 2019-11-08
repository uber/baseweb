/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell, SIZING} from '../index.js';
import Inner from './inner.js';

export const name = 'responsive-grid-sizing';

export function component() {
  return (
    <>
      <Grid sizing={SIZING.fixed}>
        <Cell span={12}>
          <Inner>1</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid sizing={SIZING.fluid}>
        <Cell span={12}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
    </>
  );
}
