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
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
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
        <Badge placement={PLACEMENT.topLeft} content="Badge">
          <Box>topLeft</Box>
        </Badge>
        <Badge placement={PLACEMENT.top} content="Badge">
          <Box>top</Box>
        </Badge>
        <Badge placement={PLACEMENT.topRight} content="Badge">
          <Box>topRight</Box>
        </Badge>
      </div>

      <div style={layout}>
        <Badge placement={PLACEMENT.bottomLeft} content="Badge">
          <Box>bottomLeft</Box>
        </Badge>
        <Badge placement={PLACEMENT.bottom} content="Badge">
          <Box>bottom</Box>
        </Badge>
        <Badge placement={PLACEMENT.bottomRight} content="Badge">
          <Box>bottomRight</Box>
        </Badge>
      </div>

      <div style={layout}>
        <Badge
          placement={PLACEMENT.topLeft}
          content="Badge"
          horizontalOffset="0"
          verticalOffset="0"
        >
          <Box>
            <div>topLeft</div>
            <div>0, 0</div>
          </Box>
        </Badge>
        <Badge placement={PLACEMENT.top} content="Badge" horizontalOffset="50%" verticalOffset="0">
          <Box>
            <div>top</div>
            <div>50%, 0</div>
          </Box>
        </Badge>
        <Badge
          placement={PLACEMENT.topRight}
          content="Badge"
          horizontalOffset="0"
          verticalOffset="-10px"
        >
          <Box>
            <div>topRight</div>
            <div>0, -10px</div>
          </Box>
        </Badge>
      </div>

      <div style={layout}>
        <Badge
          placement={PLACEMENT.bottomLeft}
          content="Badge"
          horizontalOffset="10%"
          verticalOffset="10%"
        >
          <Box>
            <div>bottomLeft</div>
            <div>10%, 10%</div>
          </Box>
        </Badge>
        <Badge placement={PLACEMENT.bottom} content="Badge" horizontalOffset="0" verticalOffset="0">
          <Box>
            <div>bottom</div>
            <div>0, 0</div>
          </Box>
        </Badge>
        <Badge placement={PLACEMENT.bottomRight} content="Badge" verticalOffset="30px">
          <Box>
            <div>bottomRight</div>
            <div>default, 30px</div>
          </Box>
        </Badge>
      </div>
    </div>
  );
}
