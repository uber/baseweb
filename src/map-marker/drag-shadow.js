/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  StyledDragShadow,
  StyledDragShadowContainer,
} from './styled-components.js';

import type {DragShadowPropsT} from './types.js';

const DragShadow = ({background, dragging, height}: DragShadowPropsT) => {
  const width = 6;
  return (
    <StyledDragShadowContainer
      $width={width}
      $height={height}
      $dragging={dragging}
    >
      <StyledDragShadow $width={width} $background={background} />
    </StyledDragShadowContainer>
  );
};

export default DragShadow;
