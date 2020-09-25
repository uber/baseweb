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

const MENU_ITEM_WIDTH = '275px';

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
          {item.mapItemToNode ? item.mapItemToNode(item) : item.label}
        </ListItemLabel>
      </MenuAdapter>
    );
  },
);

function UserMenuDropdown(props) {
  // Provide API for handlers to be called on render, like analytics
  return (
    <StatefulMenu
      items={props.userItems}
      onItemSelect={(...args) => {
        props.onItemSelect(...args);
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

const svgStyleOverride = ({$theme}) => ({paddingLeft: $theme.sizing.scale200});

export default function UserMenu(props: {|
  ...UserMenuPropsT,
  onItemSelect: NavItemT => mixed,
|}) {
  // isOpen is used for displaying different arrow icons in open or closed state
  const [isOpen, setIsOpen] = React.useState(false);
  const {username, userImgUrl} = props;

  return (
    <StatefulPopover
      content={({close}) => <UserMenuDropdown close={close} {...props} />}
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
