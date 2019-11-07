/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';

export const name = 'responsive-grid-uneven';

function Inner(props) {
  return (
    <div
      style={{
        border: 'solid 1px black',
        padding: '8px',
      }}
      {...props}
    />
  );
}

export function component() {
  return (
    <Grid>
      <Cell span={[1, 2, 4]}>
        <Inner>1</Inner>
      </Cell>
      <Cell span={[3, 6, 8]}>
        <Inner>2</Inner>
      </Cell>
    </Grid>
  );
}
