/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {MenuAdapter, ListItemLabel, ARTWORK_SIZES} from '../../list/index.js';
import ArrowLeft from '../../icon/arrow-left.js';
import UserProfileTile from '../user-menu/user-profile-tile.js';
import {StyledUserMenuListItem} from '../styled-components.js';

// eslint-disable-next-line flowtype/no-weak-types
export default React.forwardRef<{item: any}, HTMLLIElement>((props, ref) => {
  const {item = {}, ...restProps} = props;
  if (item.PARENT_MENU_ITEM) {
    return (
      <MenuAdapter
        {...restProps}
        ref={ref}
        artwork={item.navExitIcon || ArrowLeft}
        artworkSize={ARTWORK_SIZES.LARGE}
      >
        <ListItemLabel>{item.mapItemToString(item.item) || ''}</ListItemLabel>
      </MenuAdapter>
    );
  }
  if (item.USER_MENU_ITEM) {
    // Replace with a user menu item renderer
    return (
      // $FlowFixMe
      <StyledUserMenuListItem {...restProps} ref={ref}>
        <UserProfileTile {...item.item} />
      </StyledUserMenuListItem>
    );
  }
  return (
    // Replace with a main menu item renderer
    <MenuAdapter
      {...restProps}
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
});
