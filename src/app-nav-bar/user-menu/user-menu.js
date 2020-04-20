/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from '../../popover/index.js';
import {Button} from '../../button/index.js';
import {Avatar} from '../../avatar/index.js';
import ChevronDownSmallFilled from '../../icon/chevron-down.js';
import ChevronUpSmallFilled from '../../icon/chevron-up.js';
import UserMenuDropdown from './user-menu-dropdown.js';
import {StyledUserMenuButton} from '../styled-components.js';
import type {AppNavBarPropsT} from '../types.js';

const svgStyleOverride = ({$theme}) => ({paddingLeft: $theme.sizing.scale200});

export default function UserMenu(props: AppNavBarPropsT) {
  // isOpen is used for displaying different arrow icons in open or closed state
  const [isOpen, setIsOpen] = React.useState(false);
  const {username, userImgUrl} = props;

  return (
    <StatefulPopover
      placement={PLACEMENT.bottomRight}
      triggerType={TRIGGER_TYPE.click}
      dismissOnEsc={true}
      dismissOnClickOutside={true}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      content={({close}) => <UserMenuDropdown close={close} {...props} />}
    >
      <Button overrides={{BaseButton: {component: StyledUserMenuButton}}}>
        <Avatar name={username} src={userImgUrl} size={'32px'} />
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
