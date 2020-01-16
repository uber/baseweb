/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {FlexGrid, FlexGridItem} from '../index.js';

export const name = 'flex-grid';

const itemProps = {
  backgroundColor: 'mono300',
  height: 'scale1000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const component = () => (
  <FlexGrid
    flexGridColumnCount={3}
    flexGridColumnGap="scale800"
    flexGridRowGap="scale800"
  >
    <FlexGridItem {...itemProps}>1</FlexGridItem>
    <FlexGridItem {...itemProps}>2</FlexGridItem>
    <FlexGridItem {...itemProps}>3</FlexGridItem>
    <FlexGridItem {...itemProps}>4</FlexGridItem>
    <FlexGridItem {...itemProps}>5</FlexGridItem>
    <FlexGridItem {...itemProps}>6</FlexGridItem>
  </FlexGrid>
);
