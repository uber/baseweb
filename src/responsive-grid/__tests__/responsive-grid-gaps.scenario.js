/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'responsive-grid-gaps';

export function component() {
  return (
    <>
      <Grid gridGaps={[8, 16, 32]}>
        <Cell span={12}>
          <Inner>1A</Inner>
        </Cell>
        <Cell span={12}>
          <Inner>1B</Inner>
        </Cell>
        <Cell span={12}>
          <Inner>1C</Inner>
        </Cell>
      </Grid>
    </>
  );
}
