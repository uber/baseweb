/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StyledGrid, StyledCell} from './styled-components.js';
import type {GridPropsT} from './types.js';

export default function Grid({
  align,
  behavior,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridMargins,
  gridMaxWidth,
}: GridPropsT) {
  return (
    <StyledGrid
      $behavior={behavior}
      $gridMargins={gridMargins}
      $gridGutters={gridGutters}
      $gridMaxWidth={gridMaxWidth}
      $align={align}
    >
      {React.Children.map(children, child => (
        <StyledCell
          $align={child.props.align}
          $order={child.props.order}
          $skip={child.props.skip}
          $span={child.props.span}
          $gridColumns={gridColumns}
          $gridGutters={gridGutters}
          $gridGaps={gridGaps}
        >
          {child.props.children}
        </StyledCell>
      ))}
    </StyledGrid>
  );
}
