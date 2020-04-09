/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {MenuAdapter, ListItemLabel, ARTWORK_SIZES} from '../../list/index.js';

// eslint-disable-next-line flowtype/no-weak-types
const UserMenuListItem = React.forwardRef<{item: any}, HTMLLIElement>(
  (props, ref) => {
    const {item = {}} = props;
    // Replace with a user menu item renderer
    return (
      <MenuAdapter
        {...props}
        ref={ref}
        artwork={item.icon || null}
        artworkSize={ARTWORK_SIZES.LARGE}
      >
        <ListItemLabel>
          {typeof item.mapItemToNode === 'function'
            ? item.mapItemToNode(item.item)
            : item.mapItemToString(item.item)}
        </ListItemLabel>
      </MenuAdapter>
    );
  },
);

export default UserMenuListItem;
