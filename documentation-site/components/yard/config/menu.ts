/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { StatefulMenu } from 'baseui/menu';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const items = `[
  {label: 'Item One'},
  {label: 'Item Two'},
  {label: 'Item Three'},
  {label: 'Item Four'},
]`;

const OptionConfig: TConfig = {
  componentName: 'Option',
  imports: {
    'baseui/menu': {
      named: ['OptionList'],
    },
  },
  scope: {},
  theme: [],
  props: {
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['ListItem', 'ListItemAnchor'],
        sharedProps: {},
      },
    },
  },
};

const MenuConfig: TConfig = {
  componentName: 'StatefulMenu',
  imports: {
    'baseui/menu': {
      named: ['StatefulMenu'],
    },
  },
  scope: { StatefulMenu },
  theme: [
    'menuFill',
    'menuFillHover',
    'menuFontDefault',
    'menuFontDisabled',
    'menuFontHighlighted',
    'menuFontSelected',
  ],
  props: {
    items: {
      value: items,
      type: PropTypes.Array,
      description: 'Array of items in the menu.',
    },
    onItemSelect: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Callback executed on menu item clicks.',
      placeholder: '({item}) => console.log(item)',
    },
    renderAll: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders all menu content for SEO purposes regardless of menu state.',
    },
    noResultsMsg: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: 'Message to be displayed if no options is found for a search query.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          { ...OptionConfig, componentName: 'Option' },
          'List',
          'EmptyState',
          'OptgroupHeader',
        ],
        sharedProps: {},
      },
    },
  },
};

export default MenuConfig;
