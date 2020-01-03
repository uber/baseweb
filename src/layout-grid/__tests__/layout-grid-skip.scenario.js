/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Unstable_Grid as Grid, Unstable_Cell as Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'layout-grid-skip';

export function component() {
  return (
    <>
      {/* skip a cell */}
      <Grid>
        <Cell skip={1}>
          <Inner>1</Inner>
        </Cell>
      </Grid>
      <br />
      {/* skip between cells */}
      <Grid>
        <Cell>
          <Inner>1</Inner>
        </Cell>
        <Cell skip={2}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
      <br />
      {/* skip is responsive */}
      <Grid>
        <Cell>
          <Inner>1</Inner>
        </Cell>
        <Cell skip={[0, 1, 2]}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
      <br />
      {/* skip cannot exceed column count */}
      <Grid>
        <Cell skip={12}>
          <Inner>1</Inner>
        </Cell>
      </Grid>
      <br />
      {/* skip can shrink cells */}
      <Grid>
        <Cell skip={1} span={[4, 8, 12]}>
          <Inner>1</Inner>
        </Cell>
      </Grid>
      <br />
      {/* skip can wrap cells */}
      <Grid>
        <Cell span={[3, 7, 11]}>
          <Inner>1</Inner>
        </Cell>
        <Cell skip={1}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
    </>
  );
}
