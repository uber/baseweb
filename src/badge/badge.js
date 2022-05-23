/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { StyledRoot, StyledPositioner } from './styled-components.js';
import type { BadgePropsT } from './types.js';
import { PLACEMENT, ROLES, SHAPE, HIERARCHY } from './constants.js';
import InlineBadge from './inline-badge.js';
import { getAnchorFromChildren } from './utils.js';

const Badge = ({
  children,
  content,
  color,
  shape = SHAPE.rectangle,
  placement = PLACEMENT.topRight,
  hierarchy,
  horizontalOffset,
  verticalOffset,
  hidden,
  overrides = {},
}: BadgePropsT) => {
  const [Badge, badgeProps] = getOverrides(overrides.Badge, InlineBadge);
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Positioner, positionerProps] = getOverrides(overrides.Positioner, StyledPositioner);

  if (__DEV__) {
    if (
      shape === SHAPE.rectangle &&
      (placement === PLACEMENT.top || placement === PLACEMENT.bottom)
    ) {
      console.warn('Rectangle badges should only be placed in a corner or used inline');
    }
    if (shape === SHAPE.rectangle && hierarchy === HIERARCHY.secondary) {
      console.warn(
        'Secondary badges should not be positioned. Use the inline version of this badge instead.'
      );
    }
  }

  const anchor = getAnchorFromChildren(children);
  // If there's no anchor, render the badge inline
  if (!anchor) {
    return (
      <Badge color={color} shape={shape} hidden={hidden} {...badgeProps}>
        {content}
      </Badge>
    );
  }

  return (
    <Root {...rootProps}>
      {anchor}
      <Positioner
        $horizontalOffset={horizontalOffset}
        $verticalOffset={verticalOffset}
        $placement={placement}
        $role={ROLES.badge}
        {...positionerProps}
      >
        <Badge hierarchy={hierarchy} color={color} shape={shape} hidden={hidden} {...badgeProps}>
          {content}
        </Badge>
      </Positioner>
    </Root>
  );
};
export default Badge;
