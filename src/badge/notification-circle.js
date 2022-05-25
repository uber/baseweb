/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { StyledNotificationCircle, StyledRoot, StyledPositioner } from './styled-components.js';
import type { NotificationCirclePropsT } from './types.js';
import { PLACEMENT, ROLE } from './constants.js';
import { getAnchorFromChildren } from './utils.js';

const NotificationCircle = ({
  children,
  content: contentProp,
  color,
  placement = PLACEMENT.topRight,
  horizontalOffset,
  verticalOffset,
  hidden,
  overrides = {},
}: NotificationCirclePropsT) => {
  const [NotificationCircle, NotificationCircleProps] = getOverrides(
    overrides.Badge,
    StyledNotificationCircle
  );
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Positioner, positionerProps] = getOverrides(overrides.Positioner, StyledPositioner);

  const anchor = getAnchorFromChildren(children);

  if (__DEV__) {
    if (typeof contentProp === 'string') {
      console.error(`[baseui] NotificationCircle child must be number or icon, found string`);
    }
  }

  let content = contentProp;
  if (typeof content === 'number' && content > 9) {
    content = '9+';
  }

  // If there's no anchor, render the badge inline
  if (!anchor) {
    return (
      <NotificationCircle $color={color} $hidden={hidden} {...NotificationCircleProps}>
        {content}
      </NotificationCircle>
    );
  }

  return (
    <Root {...rootProps}>
      {anchor}
      <Positioner
        $horizontalOffset={horizontalOffset}
        $verticalOffset={verticalOffset}
        $placement={placement}
        $role={ROLE.notificationCircle}
        {...positionerProps}
      >
        <NotificationCircle {...NotificationCircleProps} $color={color}>
          {content}
        </NotificationCircle>
      </Positioner>
    </Root>
  );
};
export default NotificationCircle;
