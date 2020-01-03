/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Unstable_Grid as Grid, Unstable_Cell as Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'layout-grid-wrap';

export function component() {
  return (
    <>
      {/* Wrap at when exceeding column count. */}
      <Grid>
        <Cell span={[3, 7, 11]}>
          <Inner>1A</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>1A</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>1A</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>1A</Inner>
        </Cell>
      </Grid>
      <br />
      {/* Force a column break with an empty Cell. */}
      <Grid>
        <Cell span={[1, 2, 3]}>
          <Inner>2A</Inner>
        </Cell>
        <Cell span={[1, 2, 3]}>
          <Inner>2B</Inner>
        </Cell>
        <Cell span={[2, 4, 6]} />
        <Cell>
          <Inner>3B</Inner>
        </Cell>
        <Cell>
          <Inner>4B</Inner>
        </Cell>
      </Grid>
    </>
  );
}
