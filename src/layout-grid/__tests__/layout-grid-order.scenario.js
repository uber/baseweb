/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Unstable_Grid as Grid, Unstable_Cell as Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'layout-grid-order';

export function component() {
  return (
    <>
      {/* Make a cell appear first. */}
      <Grid>
        <Cell>
          <Inner>1</Inner>
        </Cell>
        <Cell order={-1}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Responsive ordering for multiple cells. */}
      <Grid>
        <Cell>
          <Inner>1</Inner>
        </Cell>
        {/* First on small, Normal on middle and up. */}
        <Cell order={[-1, 0]}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
    </>
  );
}
