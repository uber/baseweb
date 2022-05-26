/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { useStyletron } from '../styles/index.js';
import { getOverrides } from '../helpers/overrides.js';
import { StyledHintDot, StyledRoot, StyledPositioner } from './styled-components.js';
import type { HintDotPropsT } from './types.js';
import { PLACEMENT, ROLE } from './constants.js';
import { getAnchorFromChildren } from './utils.js';

const HintDot = ({
  children,
  color,
  horizontalOffset: horizontalOffsetProp,
  verticalOffset: verticalOffsetProp,
  overrides = {},
}: HintDotPropsT) => {
  const [HintDot, hintDotProps] = getOverrides(overrides.Badge, StyledHintDot);
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Positioner, positionerProps] = getOverrides(overrides.Positioner, StyledPositioner);

  const [, theme] = useStyletron();

  const anchor = getAnchorFromChildren(children);

  // if the anchor is a string, we supply a default horizontalOffset
  let horizontalOffset = horizontalOffsetProp;
  let verticalOffset = verticalOffsetProp;
  if (!horizontalOffset && typeof anchor === 'string') {
    horizontalOffset = '-14px';
    verticalOffset = '-4px';
  }
  return (
    <Root {...rootProps}>
      {anchor}
      <Positioner
        $horizontalOffset={horizontalOffset}
        $verticalOffset={verticalOffset}
        $placement={theme.direction === 'rtl' ? PLACEMENT.topLeft : PLACEMENT.topRight}
        $role={ROLE.hintDot}
        {...positionerProps}
      >
        <HintDot {...hintDotProps} $color={color} $horizontalOffset={horizontalOffset} />
      </Positioner>
    </Root>
  );
};
export default HintDot;
