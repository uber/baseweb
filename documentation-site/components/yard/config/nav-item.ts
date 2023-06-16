/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { BottomNavigation, NavItem } from 'baseui/bottom-navigation';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const NavItemConfig: TConfig = {
  componentName: 'NavItem',
  imports: {
    'baseui/bottom-navigation': { named: ['NavItem'] },
  },
  scope: {
    BottomNavigation,
    NavItem,
  },
  theme: [],
  props: {
    title: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: 'The title of the NavItem.',
    },
    icon: {
      value: undefined,
      type: PropTypes.Object,
      description: 'Provide the `size` of the icon',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Title', 'Selector', 'Panel'],
      },
    },
    children: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: `The content of the NavItem.`,
    },
  },
};

export default NavItemConfig;
