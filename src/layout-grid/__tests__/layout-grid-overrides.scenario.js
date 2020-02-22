/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';

export default function Scenario() {
  return (
    <>
      <Grid
        overrides={{
          Grid: {
            style: {
              boxShadow: `inset 0px 0px 0px 1px blue`,
            },
            props: {
              $gridMaxWidth: 800,
            },
          },
        }}
      >
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell
          overrides={{
            Cell: {
              style: {
                boxShadow: 'inset 0px 0px 0px 1px green',
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
    </>
  );
}
