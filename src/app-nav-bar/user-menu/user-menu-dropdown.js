/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StatefulMenu, StyledList} from '../../menu/index.js';
import UserMenuListItem from './user-menu-list-item.js';
import UserProfileTile from './user-profile-tile.js';
import {StyledUserMenuListItem} from '../styled-components.js';
import type {AppNavBarPropsT} from '../types.js';

const MENU_ITEM_WIDTH = '275px';

export default function UserMenuDropdown(props: {|
  ...AppNavBarPropsT,
  ...{|close: () => void|},
|}) {
  // Provide API for handlers to be called on render, like analytics
  return (
    <StatefulMenu
      items={props.userNav || []}
      onItemSelect={(...args) => {
        props.onNavItemSelect(...args);
        props.close();
      }}
      overrides={{
        List: {
          component: React.forwardRef(({children, ...restProps}, ref) => (
            <StyledList {...restProps} ref={ref}>
              <StyledUserMenuListItem>
                {/* Replace with a renderer: renderUserProfileTile() */}
                <UserProfileTile
                  username={props.username}
                  usernameSubtitle={props.usernameSubtitle}
                  userImgUrl={props.userImgUrl}
                />
              </StyledUserMenuListItem>
              {children}
            </StyledList>
          )),
          style: {width: MENU_ITEM_WIDTH},
        },
        ListItem: {
          component: UserMenuListItem,
        },
      }}
    />
  );
}
