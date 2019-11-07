/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'responsive-grid-skip';

export function component() {
  return (
    <>
      <Grid>
        <Cell>
          <Inner>1A</Inner>
        </Cell>
        <Cell skip={2}>
          <Inner>1B</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell skip={1}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
      {/* Skip will not be greater than or equal to the column count. */}
      <Grid>
        <Cell skip={4}>
          <Inner>3</Inner>
        </Cell>
      </Grid>
      {/* Skips will shrink spans to fit on same line. */}
      <Grid>
        <Cell span={4}>
          <Inner>4A</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell skip={1} span={4}>
          <Inner>4B</Inner>
        </Cell>
      </Grid>
      {/* Skips are responsive. */}
      <Grid>
        <Cell skip={[0, 1, 2]}>
          <Inner>5</Inner>
        </Cell>
      </Grid>
    </>
  );
}
