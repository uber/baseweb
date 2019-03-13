/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {Popover} from '../popover/index.js';

type PropsT = {
  children: React.Node,
  getChildMenu: ?(item: *) => React.Node,
  isOpen: boolean,
  item: *,
  resetParentMenu: () => void,
};

export default function MaybeChildMenu(props: PropsT) {
  if (!props.getChildMenu) {
    return props.children;
  }

  const ChildMenu = props.getChildMenu(props.item);
  if (!ChildMenu) {
    return props.children;
  }

  return (
    <Popover
      isOpen={props.isOpen}
      content={ChildMenu}
      ignoreBoundary
      onMouseEnterDelay={30}
      onMouseLeaveDelay={30}
      placement="rightTop"
      // Adds onMouseLeave handler to popover body so that child menu closes
      // when user mouses out.
      overrides={{Body: {props: {onMouseLeave: props.resetParentMenu}}}}
    >
      {props.children}
    </Popover>
  );
}
