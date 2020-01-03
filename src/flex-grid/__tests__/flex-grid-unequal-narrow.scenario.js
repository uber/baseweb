/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {FlexGrid, FlexGridItem} from '../index.js';

export const name = 'flex-grid-unequal-narrow';

const itemProps = {
  backgroundColor: 'mono300',
  height: 'scale1000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const narrowItemProps = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: $theme.sizing.scale1600,
        flexGrow: 0,
      }),
    },
  },
};

export const component = () => (
  <FlexGrid
    flexGridColumnCount={3}
    flexGridColumnGap="scale800"
    flexGridRowGap="scale800"
  >
    <FlexGridItem {...itemProps}>Item</FlexGridItem>
    <FlexGridItem {...narrowItemProps}>Narrow</FlexGridItem>
    <FlexGridItem {...itemProps}>Item</FlexGridItem>
    <FlexGridItem {...itemProps}>Item</FlexGridItem>
    <FlexGridItem {...narrowItemProps}>Narrow</FlexGridItem>
    <FlexGridItem {...itemProps}>Item</FlexGridItem>
  </FlexGrid>
);
