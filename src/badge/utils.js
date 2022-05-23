/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

export const getAnchorFromChildren = (children: ?React.Node) => {
  const childArray = React.Children.toArray(children);
  if (childArray.length !== 1) {
    // eslint-disable-next-line no-console
    console.error(
      `[baseui] Exactly 1 child must be passed to Badge, found ${childArray.length} children`
    );
  }
  return childArray[0];
};
