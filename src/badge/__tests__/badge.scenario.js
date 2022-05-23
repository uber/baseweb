/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { PLACEMENT } from '../constants.js';

import { Badge } from '../index.js';
import { styled } from '../../styles/index.js';

export const Box = styled<{}>('div', ({ $theme }) => ({
  borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
  borderTopRightRadius: $theme.borders.surfaceBorderRadius,
  backgroundColor: $theme.colors.primaryA,
  height: '186px',
  width: '328px',
}));

const layout = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
};

export function Scenario() {
  return (
    <div>
      <div style={layout}>
        <Badge placement={PLACEMENT.topLeft} content="topLeft">
          <Box />
        </Badge>
        <Badge placement={PLACEMENT.top} content="top">
          <Box />
        </Badge>
        <Badge placement={PLACEMENT.topRight} content="topRight">
          <Box />
        </Badge>
      </div>

      <div style={layout}>
        <Badge placement={PLACEMENT.bottomLeft} content="bottomLeft">
          <Box />
        </Badge>
        <Badge placement={PLACEMENT.bottom} content="bottom">
          <Box />
        </Badge>
        <Badge placement={PLACEMENT.bottomRight} content="bottomRight">
          <Box />
        </Badge>
      </div>

      <div style={layout}>
        <Badge
          placement={PLACEMENT.topLeft}
          content="TL 0,0"
          horizontalOffset="0px"
          verticalOffset="0px"
        >
          <Box />
        </Badge>
        <Badge
          placement={PLACEMENT.top}
          content="T 50%,0"
          horizontalOffset="50%"
          verticalOffset="0"
        >
          <Box />
        </Badge>
        <Badge
          placement={PLACEMENT.topRight}
          content="TR 0,-10px"
          horizontalOffset="0"
          verticalOffset="-10px"
        >
          <Box />
        </Badge>
      </div>

      <div style={layout}>
        <Badge
          placement={PLACEMENT.bottomLeft}
          content="BL 10%,10%"
          horizontalOffset="10%"
          verticalOffset="10%"
        >
          <Box />
        </Badge>
        <Badge placement={PLACEMENT.bottom} content="B 0,0" horizontalOffset="0" verticalOffset="0">
          <Box />
        </Badge>
        <Badge placement={PLACEMENT.bottomRight} content="BR null,30x" verticalOffset="30px">
          <Box />
        </Badge>
      </div>
    </div>
  );
}
