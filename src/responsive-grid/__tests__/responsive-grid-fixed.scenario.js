/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Grid, Cell} from '../index.js';
import Inner from './inner.js';

export const name = 'responsive-grid-fixed';

export function component() {
  return (
    <>
      <Grid>
        <Cell>
          <Inner>1A</Inner>
        </Cell>
        <Cell>
          <Inner>1B</Inner>
        </Cell>
        <Cell>
          <Inner>1C</Inner>
        </Cell>
        <Cell>
          <Inner>1D</Inner>
        </Cell>
        <Cell>
          <Inner>1E</Inner>
        </Cell>
        <Cell>
          <Inner>1F</Inner>
        </Cell>
        <Cell>
          <Inner>1G</Inner>
        </Cell>
        <Cell>
          <Inner>1H</Inner>
        </Cell>
        <Cell>
          <Inner>1I</Inner>
        </Cell>
        <Cell>
          <Inner>1J</Inner>
        </Cell>
        <Cell>
          <Inner>1K</Inner>
        </Cell>
        <Cell>
          <Inner>1L</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell span={2}>
          <Inner>2A</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2B</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2C</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2D</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2E</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2F</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell span={3}>
          <Inner>3A</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>3B</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>3C</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>3D</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell span={4}>
          <Inner>4A</Inner>
        </Cell>
        <Cell span={4}>
          <Inner>4B</Inner>
        </Cell>
        <Cell span={4}>
          <Inner>4C</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell span={6}>
          <Inner>5A</Inner>
        </Cell>
        <Cell span={6}>
          <Inner>5B</Inner>
        </Cell>
      </Grid>
      <Grid>
        <Cell span={12}>
          <Inner>6</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid>
        <Cell span={1}>
          <Inner>A1</Inner>
        </Cell>
        <Cell span={11}>
          <Inner>A2</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>B1</Inner>
        </Cell>
        <Cell span={10}>
          <Inner>B2</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>C1</Inner>
        </Cell>
        <Cell span={9}>
          <Inner>C2</Inner>
        </Cell>
        <Cell span={4}>
          <Inner>D1</Inner>
        </Cell>
        <Cell span={8}>
          <Inner>D2</Inner>
        </Cell>
        <Cell span={5}>
          <Inner>E1</Inner>
        </Cell>
        <Cell span={7}>
          <Inner>E2</Inner>
        </Cell>
        <Cell span={6}>
          <Inner>F1</Inner>
        </Cell>
        <Cell span={6}>
          <Inner>F2</Inner>
        </Cell>
        <Cell span={7}>
          <Inner>G1</Inner>
        </Cell>
        <Cell span={5}>
          <Inner>G2</Inner>
        </Cell>
        <Cell span={8}>
          <Inner>H1</Inner>
        </Cell>
        <Cell span={4}>
          <Inner>H2</Inner>
        </Cell>
        <Cell span={9}>
          <Inner>I1</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>I2</Inner>
        </Cell>
        <Cell span={10}>
          <Inner>J1</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>J2</Inner>
        </Cell>
        <Cell span={11}>
          <Inner>K1</Inner>
        </Cell>
        <Cell span={1}>
          <Inner>K2</Inner>
        </Cell>
      </Grid>
    </>
  );
}
