/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'responsive-grid-order';

export function component() {
  return (
    <>
      {/* Make a cell appear first. */}
      <Grid>
        <Cell>
          <Inner>1A</Inner>
        </Cell>
        <Cell order={-1}>
          <Inner>1B</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Responsive ordering for multiple cells. */}
      <Grid>
        {/* Normal, Last, Normal */}
        <Cell order={[0, 1, 0]}>
          <Inner>2A</Inner>
        </Cell>
        <Cell>
          <Inner>2B</Inner>
        </Cell>
        <Cell>
          <Inner>2C</Inner>
        </Cell>
        <Cell>
          <Inner>2D</Inner>
        </Cell>
        {/* First, Normal, First */}
        <Cell order={[-1, 0, -1]}>
          <Inner>2E</Inner>
        </Cell>
      </Grid>
    </>
  );
}
