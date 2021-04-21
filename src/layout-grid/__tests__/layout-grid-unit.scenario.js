/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';
import Inner from './inner.js';

export default function Scenario() {
  return (
    <Grid
      gridUnit="rem"
      gridGutters={1}
      gridGaps={1}
      gridMargins={2}
      gridMaxWidth={40}
    >
      <Cell span={[2, 4, 6]}>
        <Inner>1</Inner>
      </Cell>
      <Cell span={[2, 4, 6]}>
        <Inner>2</Inner>
      </Cell>
      <Cell span={[2, 4, 6]}>
        <Inner>3</Inner>
      </Cell>
      <Cell span={[2, 4, 6]}>
        <Inner>4</Inner>
      </Cell>
    </Grid>
  );
}
