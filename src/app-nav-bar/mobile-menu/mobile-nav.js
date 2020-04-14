/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Button} from '../../button/index.js';
import {Drawer, ANCHOR} from '../../drawer/index.js';
import MenuIcon from '../../icon/menu.js';
import MobileNavMenu from './mobile-nav-menu.js';
import {StyledSideMenuButton} from '../styled-components.js';
import type {AppNavBarPropsT} from '../types.js';

export default function MobileNav(props: AppNavBarPropsT) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        overrides={{BaseButton: {component: StyledSideMenuButton}}}
        onClick={toggleMenu}
      >
        <MenuIcon size={'24px'} />
      </Button>
      <Drawer
        anchor={ANCHOR.left}
        isOpen={isOpen}
        onClose={toggleMenu}
        size={'75%'}
        overrides={{
          DrawerBody: {
            style: ({$theme}) => {
              return {
                marginTop: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
                marginRight: '0px',
              };
            },
          },
          // Removes the close icon from the drawer
          Close: () => null,
        }}
      >
        <MobileNavMenu close={toggleMenu} {...props} />
      </Drawer>
    </>
  );
}
