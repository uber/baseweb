/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../styles/index';
import { getOverrides } from '../helpers/overrides';
import { StyledHintDot, StyledRoot, StyledPositioner } from './styled-components';
import type { HintDotProps } from './types';
import { PLACEMENT, ROLE } from './constants';
import { getAnchorFromChildren } from './utils';

const HintDot = ({
  children,
  color,
  horizontalOffset: horizontalOffsetProp,
  verticalOffset: verticalOffsetProp,
  hidden,
  overrides = {},
}: HintDotProps) => {
  const [HintDot, hintDotProps] = getOverrides(overrides.Badge, StyledHintDot);
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Positioner, positionerProps] = getOverrides(overrides.Positioner, StyledPositioner);

  const [, theme] = useStyletron();

  const anchor = getAnchorFromChildren(children);

  // if the anchor is a string, we supply default offsets
  let horizontalOffset = horizontalOffsetProp;
  let verticalOffset = verticalOffsetProp;
  if (typeof anchor === 'string') {
    if (!horizontalOffset) {
      horizontalOffset = '-14px';
    }
    if (!verticalOffset) {
      verticalOffset = '-4px';
    }
  }
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <Root {...rootProps}>
      {anchor}
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <Positioner
        $horizontalOffset={horizontalOffset}
        $verticalOffset={verticalOffset}
        $placement={theme.direction === 'rtl' ? PLACEMENT.topLeft : PLACEMENT.topRight}
        $role={ROLE.hintDot}
        {...positionerProps}
      >
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <HintDot
          {...hintDotProps}
          $color={color}
          $horizontalOffset={horizontalOffset}
          $hidden={hidden}
        />
      </Positioner>
    </Root>
  );
};
export default HintDot;
