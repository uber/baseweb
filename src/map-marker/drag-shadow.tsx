/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { dragShadowWidth } from './constants';
import { StyledDragShadow, StyledDragShadowContainer } from './styled-components';
import type { DragShadowProps } from './types';

const DragShadow = ({ background, dragging, height, overrides = {} }: DragShadowProps) => {
  const [DragShadowContainer, dragShadowContainerProps] = getOverrides(
    overrides.DragShadowContainer,
    StyledDragShadowContainer
  );
  const [DragShadow, dragShadowProps] = getOverrides(overrides.DragShadow, StyledDragShadow);

  return (
    <DragShadowContainer
      $width={dragShadowWidth}
      $height={height}
      $dragging={dragging}
      {...dragShadowContainerProps}
    >
      <DragShadow $width={dragShadowWidth} $background={background} {...dragShadowProps} />
    </DragShadowContainer>
  );
};

export default DragShadow;
