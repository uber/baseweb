/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Grid, Cell } from '../index';

export function Scenario() {
  return (
    <Grid
      gridMaxWidth={800}
      overrides={{
        Grid: {
          style: {
            backgroundColor: `skyblue`,
            marginTop: '12px',
          },
        },
      }}
    >
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell
        span={1} // override takes priority
        overrides={{
          Cell: {
            style: {
              backgroundColor: `cornflowerblue`,
            },

            props: {
              $span: [1, 5, 8],
            },
          },
        }}
      >
        4
      </Cell>
    </Grid>
  );
}
