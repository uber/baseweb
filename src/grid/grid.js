/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StyledGrid} from './styled-components.js';
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
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          $gridColumns: gridColumns,
          $gridGutters: gridGutters,
          $gridGaps: gridGaps,
        }),
      )}
    </StyledGrid>
  );
}
