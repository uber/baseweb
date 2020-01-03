/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Unstable_Grid as Grid, Unstable_Cell as Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'layout-grid-custom';

export function component() {
  return (
    <>
      {/* A compact twelve column grid. */}
      <Grid
        gridColumns={12}
        gridMaxWidth={1440}
        gridMargins={[8, 16, 32]}
        gridGutters={[2, 6, 12]}
        gridGaps={[2, 6, 12]}
      >
        <Cell>
          <Inner>1</Inner>
        </Cell>
        <Cell>
          <Inner>2</Inner>
        </Cell>
        <Cell>
          <Inner>3</Inner>
        </Cell>
        <Cell>
          <Inner>4</Inner>
        </Cell>
        <Cell>
          <Inner>5</Inner>
        </Cell>
        <Cell>
          <Inner>6</Inner>
        </Cell>
        <Cell>
          <Inner>7</Inner>
        </Cell>
        <Cell>
          <Inner>8</Inner>
        </Cell>
        <Cell>
          <Inner>9</Inner>
        </Cell>
        <Cell>
          <Inner>10</Inner>
        </Cell>
        <Cell>
          <Inner>11</Inner>
        </Cell>
        <Cell>
          <Inner>12</Inner>
        </Cell>
      </Grid>
    </>
  );
}
