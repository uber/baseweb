/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Avatar} from '../avatar/index.js';
import {Button} from '../button/index.js';
import ChevronDownSmallFilled from '../icon/chevron-down.js';
import ChevronUpSmallFilled from '../icon/chevron-up.js';
import {MenuAdapter, ListItemLabel, ARTWORK_SIZES} from '../list/index.js';
import {StatefulMenu, StyledList} from '../menu/index.js';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from '../popover/index.js';
import {LabelMedium, ParagraphSmall} from '../typography/index.js';

import {
  StyledUserMenuButton,
  StyledUserMenuListItem,
} from './styled-components.js';
import type {UserMenuPropsT, NavItemT} from './types.js';
import UserProfileTile from './user-profile-tile.js';
import {defaultMapItemToNode} from './utils.js';

const MENU_ITEM_WIDTH = '275px';

const UserMenuListItem = React.forwardRef<
  {item: any, mapItemToNode: NavItemT => React.Node},
  HTMLLIElement,
>((props, ref) => {
  const {item, mapItemToNode = defaultMapItemToNode} = props;
  // Replace with a user menu item renderer
  return (
    <MenuAdapter
      {...props}
      ref={ref}
      artwork={item.icon || null}
      artworkSize={ARTWORK_SIZES.LARGE}
    >
      <ListItemLabel>{mapItemToNode(item)}</ListItemLabel>
    </MenuAdapter>
  );
});

const svgStyleOverride = ({$theme}) => ({paddingLeft: $theme.sizing.scale200});

export default function UserMenu(props: {|
  ...UserMenuPropsT,
  onItemSelect: NavItemT => mixed,
  mapItemToNode: NavItemT => React.Node,
|}) {
  // isOpen is used for displaying different arrow icons in open or closed state
  const [isOpen, setIsOpen] = React.useState(false);
  const {userItems = [], username, userImgUrl} = props;

  return (
    <StatefulPopover
      content={({close}) => (
        <StatefulMenu
          items={userItems}
          onItemSelect={({item}) => {
            props.onItemSelect(item);
            close();
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
              component: listItemProps => (
                <UserMenuListItem
                  {...listItemProps}
                  mapItemToNode={props.mapItemToNode}
                />
              ),
            },
          }}
        />
      )}
      dismissOnEsc={true}
      dismissOnClickOutside={true}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement={PLACEMENT.bottomRight}
      popperOptions={{modifiers: {flip: {enabled: false}}}}
      triggerType={TRIGGER_TYPE.click}
    >
      <Button overrides={{BaseButton: {component: StyledUserMenuButton}}}>
        <Avatar name={username || ''} src={userImgUrl} size={'32px'} />
        {isOpen ? (
          <ChevronUpSmallFilled
            size={28}
            overrides={{Svg: {style: svgStyleOverride}}}
          />
        ) : (
          <ChevronDownSmallFilled
            size={28}
            overrides={{Svg: {style: svgStyleOverride}}}
          />
        )}
      </Button>
    </StatefulPopover>
  );
}
