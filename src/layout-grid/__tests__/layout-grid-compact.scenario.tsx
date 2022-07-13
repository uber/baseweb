/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Grid, Cell, STYLE } from '..';
import Inner from './inner';

export function Scenario() {
  return (
    <>
      <Grid gridStyle={STYLE.compact}>
        <>
          <Cell span={12}>
            <Inner>1</Inner>
          </Cell>
          {null}
        </>
      </Grid>
      <br />
      <Grid gridStyle={STYLE.compact}>
        <Cell span={6}>
          <Inner>1</Inner>
        </Cell>
        <Cell span={6}>
          <Inner>2</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid gridStyle={STYLE.compact}>
        <Cell span={4}>
          <Inner>1</Inner>
        </Cell>
        <Cell span={4}>
          <Inner>2</Inner>
        </Cell>
        <Cell span={4}>
          <Inner>3</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid gridStyle={STYLE.compact}>
        <Cell span={3}>
          <Inner>1</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>2</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>3</Inner>
        </Cell>
        <Cell span={3}>
          <Inner>4</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid gridStyle={STYLE.compact}>
        <Cell span={2}>
          <Inner>1</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>3</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>4</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>5</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>6</Inner>
        </Cell>
      </Grid>
      <br />
      <Grid gridStyle={STYLE.compact}>
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
