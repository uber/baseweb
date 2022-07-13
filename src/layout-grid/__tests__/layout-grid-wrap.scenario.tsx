/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Grid, Cell } from '..';
import Inner from './inner';

export function Scenario() {
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
