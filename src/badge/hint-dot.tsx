/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
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
  // placement was not there for hintBadge, but we need to support in for Avatar and other potential use cases.
  placement = PLACEMENT.topRight,
  hasBorder = true,
  overrides = {},
}: HintDotProps) => {
  const [HintDot, hintDotProps] = getOverrides(overrides.Badge, StyledHintDot);
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Positioner, positionerProps] = getOverrides(overrides.Positioner, StyledPositioner);

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
    <Root {...rootProps}>
      {anchor}

      <Positioner
        aria-hidden={true}
        $horizontalOffset={horizontalOffset}
        $verticalOffset={verticalOffset}
        $placement={placement}
        $role={ROLE.hintDot}
        $noAnchor={!anchor}
        $hasBorder={hasBorder}
        {...positionerProps}
      >
        <HintDot
          data-baseweb="hint-badge"
          $color={color}
          $horizontalOffset={horizontalOffset}
          $hidden={hidden}
          $hasBorder={hasBorder}
          {...hintDotProps}
        />
      </Positioner>
    </Root>
  );
};
export default HintDot;
