/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { StyledNotificationCircle, StyledRoot, StyledPositioner } from './styled-components';
import type { NotificationCircleProps } from './types';
import { PLACEMENT, ROLE, NOTIFICATION_CIRCLE_SIZE } from './constants';
import { getAnchorFromChildren } from './utils';

const NotificationCircle = ({
  children,
  content: contentProp,
  color,
  placement = PLACEMENT.topRight,
  horizontalOffset,
  verticalOffset,
  hidden,
  size = NOTIFICATION_CIRCLE_SIZE.medium,
  overrides = {},
}: NotificationCircleProps) => {
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
    if (
      placement &&
      placement !== PLACEMENT.topLeft &&
      placement !== PLACEMENT.topRight &&
      placement !== PLACEMENT.bottomLeft &&
      placement !== PLACEMENT.bottomRight
    ) {
      console.error(
        `[baseui] NotificationCircle must be placed topLeft, topRight, bottomLeft, or bottomRight, found ${placement}`
      );
    }
  }

  let content = contentProp;
  const ICON_SIZE = size === NOTIFICATION_CIRCLE_SIZE.small ? 10 : 12;
  const isContentNumber = typeof content === 'number';
  if (typeof content === 'number' && content > 99) {
    content = '99+';
  } else if (typeof content === 'function') {
    // add support for render prop, content = (size) => <Icon size={size} />
    content = content(ICON_SIZE);
  } else if (React.isValidElement(content)) {
    // backwards compatibility for icon element as child, clone the element and pass size as prop
    // content = <Icon />
    // React.cloneElement is not recommended but we need this to support the old way of passing icon element as content
    content = React.cloneElement(content as React.ReactElement<{ size?: number }>, {
      size: ICON_SIZE,
    });
  }

  // If there's no anchor, render the badge inline
  if (!anchor) {
    return (
      <NotificationCircle
        data-baseweb="notification-badge"
        $color={color}
        $hidden={hidden}
        $size={size}
        $extraPadding={isContentNumber}
        aria-hidden={true}
        {...NotificationCircleProps}
      >
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
        aria-hidden={true}
        {...positionerProps}
      >
        <NotificationCircle
          data-baseweb="notification-badge"
          $color={color}
          $hidden={hidden}
          $size={size}
          $extraPadding={isContentNumber}
          {...NotificationCircleProps}
        >
          {content}
        </NotificationCircle>
      </Positioner>
    </Root>
  );
};
export default NotificationCircle;
