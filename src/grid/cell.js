/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StyledCell} from './styled-components.js';
import type {CellPropsT} from './types.js';

export default function Cell({
  align,
  children,
  order,
  skip,
  span,
  $gridColumns,
  $gridGutters,
  $gridGaps,
}: CellPropsT) {
  return (
    <StyledCell
      $align={align}
      $order={order}
      $skip={skip}
      $span={span}
      $gridColumns={$gridColumns}
      $gridGutters={$gridGutters}
      $gridGaps={$gridGaps}
    >
      {children}
    </StyledCell>
  );
}
