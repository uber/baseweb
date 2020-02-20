/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell, StyledCell} from '../index.js';

export default function Scenario() {
  return (
    <>
      <Grid
        overrides={{
          StyledGrid: {
            style: {
              boxShadow: `inset 0px 0px 0px 1px blue`,
            },
          },
          // applied to every cell in grid
          StyledCell: {
            style: {
              boxShadow: 'inset 0px 0px 0px 1px red',
            },
            props: {
              $span: [1, 2, 3],
            },
            component: StyledCell, // not sure why you would do this...
          },
        }}
      >
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell
          overrides={{
            // set individual cell styles
            StyledCell: {
              style: {
                boxShadow: 'inset 0px 0px 0px 1px green',
              },
            },
          }}
        >
          4*
        </Cell>
      </Grid>
    </>
  );
}
