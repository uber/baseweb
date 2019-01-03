/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {StatefulPopover} from '../popover/index.js';

type PropsT = {
  children: React.Node,
  getChildMenu: ?(item: *) => React.Node,
  item: *,
};

export default function MaybeChildMenu(props: PropsT) {
  if (!props.getChildMenu) {
    return props.children;
  }

  return (
    <StatefulPopover
      content={props.getChildMenu(props.item)}
      ignoreBoundary
      onMouseEnterDelay={100}
      onMouseLeaveDelay={100}
      placement="rightTop"
      triggerType="hover"
    >
      {props.children}
    </StatefulPopover>
  );
}
