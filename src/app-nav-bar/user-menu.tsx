/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import ChevronDownSmallFilled from '../icon/chevron-down';
import ChevronUpSmallFilled from '../icon/chevron-up';
import { MenuAdapter, ListItemLabel, ARTWORK_SIZES } from '../list';
import { StatefulMenu, StyledList } from '../menu';
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from '../popover';

import { StyledUserMenuButton, StyledUserMenuProfileListItem } from './styled-components';
import type { UserMenuProps, NavItem, AppNavBarOverrides } from './types';
import UserProfileTile from './user-profile-tile';
import { defaultMapItemToNode } from './utils';

const MENU_ITEM_WIDTH = '275px';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
const UserMenuListItem = React.forwardRef<any, any>((props, ref) => {
  const { item, mapItemToNode = defaultMapItemToNode } = props;
  // Replace with a user menu item renderer
  return (
    <MenuAdapter {...props} ref={ref} artwork={item.icon || null} artworkSize={ARTWORK_SIZES.LARGE}>
      <ListItemLabel>{mapItemToNode(item)}</ListItemLabel>
    </MenuAdapter>
  );
});

// @ts-ignore
const svgStyleOverride = ({ $theme }) => ({ paddingLeft: $theme.sizing.scale200 });

export default function UserMenuComponent(
  props: {
    mapItemToNode: (a: NavItem) => React.ReactNode;
    onItemSelect: (a: NavItem) => unknown;
    overrides: AppNavBarOverrides;
  } & UserMenuProps
) {
  // isOpen is used for displaying different arrow icons in open or closed state
  const [isOpen, setIsOpen] = React.useState(false);
  const { userItems = [], username, userImgUrl, overrides = {} } = props;

  const [UserMenuProfileListItem, userMenuProfileListItemProps] = getOverrides(
    overrides.UserMenuProfileListItem,
    StyledUserMenuProfileListItem
  );

  const [UserMenuButton, userMenuButtonProps] = getOverrides(overrides.UserMenuButton, Button);
  userMenuButtonProps.overrides = mergeOverrides(
    { BaseButton: { component: StyledUserMenuButton } },
    userMenuButtonProps.overrides
  );

  const [UserMenu, userMenuProps] = getOverrides(overrides.UserMenu, StatefulMenu);
  userMenuProps.overrides = mergeOverrides(
    {
      List: {
        // eslint-disable-next-line react/display-name
        component: React.forwardRef<HTMLUListElement, any>(({ children, ...restProps }, ref) => (
          <StyledList {...restProps} ref={ref}>
            <UserMenuProfileListItem {...userMenuProfileListItemProps}>
              {/* Replace with a renderer: renderUserProfileTile() */}
              <UserProfileTile
                username={props.username}
                usernameSubtitle={props.usernameSubtitle}
                userImgUrl={props.userImgUrl}
                overrides={overrides}
              />
            </UserMenuProfileListItem>
            {children}
          </StyledList>
        )),
        style: { width: MENU_ITEM_WIDTH },
      },
      // eslint-disable-next-line react/display-name
      ListItem: React.forwardRef((listItemProps, ref) => {
        return (
          <UserMenuListItem ref={ref} {...listItemProps} mapItemToNode={props.mapItemToNode} />
        );
      }),
    },
    userMenuProps.overrides
  );

  return (
    <StatefulPopover
      content={({ close }) => (
        <UserMenu
          items={userItems}
          // @ts-ignore
          onItemSelect={({ item }) => {
            props.onItemSelect(item);
            close();
          }}
          {...userMenuProps}
        />
      )}
      autoFocus={false}
      dismissOnEsc={true}
      dismissOnClickOutside={true}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement={PLACEMENT.bottomRight}
      popperOptions={{ modifiers: { flip: { enabled: false } } }}
      triggerType={TRIGGER_TYPE.click}
    >
      <UserMenuButton {...userMenuButtonProps}>
        <Avatar name={username || ''} src={userImgUrl} size={'32px'} />
        {isOpen ? (
          <ChevronUpSmallFilled size={28} overrides={{ Svg: { style: svgStyleOverride } }} />
        ) : (
          <ChevronDownSmallFilled size={28} overrides={{ Svg: { style: svgStyleOverride } }} />
        )}
      </UserMenuButton>
    </StatefulPopover>
  );
}
