/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { PLACEMENT } from '../constants';
import { Badge } from '../index';
import { styled } from '../../styles/index';

export const Box = styled<{}>('div', ({ $theme }) => ({
  borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
  borderTopRightRadius: $theme.borders.surfaceBorderRadius,
  backgroundColor: $theme.colors.primaryA,
  height: '140px',
  width: '220px',
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

        <Badge placement={PLACEMENT.topRight} content="Badge">
          <Box>topRight</Box>
        </Badge>

        <Badge placement={PLACEMENT.bottomRight} content="Badge">
          <Box>bottomRight</Box>
        </Badge>

        <Badge placement={PLACEMENT.bottomLeft} content="Badge">
          <Box>bottomLeft</Box>
        </Badge>
      </div>

      <div style={layout}>
        <Badge placement={PLACEMENT.topLeftEdge} content="Badge">
          <Box>topLeftEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.topEdge} content="Badge">
          <Box>topEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.topRightEdge} content="Badge">
          <Box>topRightEdge</Box>
        </Badge>
      </div>

      <div style={layout}>
        <Badge placement={PLACEMENT.bottomRightEdge} content="Badge">
          <Box>bottomRightEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.bottomEdge} content="Badge">
          <Box>bottomEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.bottomLeftEdge} content="Badge">
          <Box>bottomLeftEdge</Box>
        </Badge>
      </div>

      <div style={layout}>
        <Badge placement={PLACEMENT.leftTopEdge} content="Badge">
          <Box>leftTopEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.rightTopEdge} content="Badge">
          <Box>rightTopEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.rightBottomEdge} content="Badge">
          <Box>rightBottomEdge</Box>
        </Badge>

        <Badge placement={PLACEMENT.leftBottomEdge} content="Badge">
          <Box>leftBottomEdge</Box>
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
            <div>Offsets: 0, 0</div>
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
            <div>Offsets: 0, -10px</div>
          </Box>
        </Badge>
        <Badge
          placement={PLACEMENT.bottomLeft}
          content="Badge"
          horizontalOffset="10%"
          verticalOffset="10%"
        >
          <Box>
            <div>bottomLeft</div>
            <div>Offsets: 10%, 10%</div>
          </Box>
        </Badge>
        <Badge placement={PLACEMENT.bottomRight} content="Badge" verticalOffset="30px">
          <Box>
            <div>bottomRight</div>
            <div>Offsets: default, 30px</div>
          </Box>
        </Badge>
      </div>
    </div>
  );
}
