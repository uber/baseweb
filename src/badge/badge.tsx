/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { StyledBadge, StyledRoot, StyledPositioner } from './styled-components';
import type { BadgePropsT } from './types';
import { PLACEMENT, ROLE, SHAPE, HIERARCHY } from './constants';
import { getAnchorFromChildren } from './utils';

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
  const [Badge, badgeProps] = getOverrides(overrides.Badge, StyledBadge);
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Positioner, positionerProps] = getOverrides(overrides.Positioner, StyledPositioner);

  const anchor = getAnchorFromChildren(children);

  const VALID_RECT_PLACEMENTS = [
    PLACEMENT.topLeft,
    PLACEMENT.topRight,
    PLACEMENT.bottomRight,
    PLACEMENT.bottomLeft,
  ];

  if (__DEV__) {
    if (shape === SHAPE.rectangle && !VALID_RECT_PLACEMENTS.includes(placement)) {
      console.warn('Rectangle badges should only be placed in a corner or used inline');
    }
    if (shape === SHAPE.rectangle && hierarchy === HIERARCHY.secondary && anchor) {
      console.warn(
        'Secondary badges should not be positioned. Use the inline version of this badge instead.'
      );
    }
    if (shape === SHAPE.pill && hierarchy === HIERARCHY.secondary) {
      console.warn('Pill badges should only be used with primary hierarchy');
    }
  }

  // If there's no anchor, render the badge inline
  if (!anchor) {
    return (
      <Badge $hierarchy={hierarchy} $shape={shape} $color={color} $hidden={hidden} {...badgeProps}>
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
        $role={ROLE.badge}
        {...positionerProps}
      >
        <Badge
          $hierarchy={hierarchy}
          $shape={shape}
          $color={color}
          $hidden={hidden}
          {...badgeProps}
        >
          {content}
        </Badge>
      </Positioner>
    </Root>
  );
};
export default Badge;
