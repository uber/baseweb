import {StatefulMenu} from 'baseui/menu';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const menuProps = require('!!extract-react-types-loader!../../../../src/menu/stateful-menu.js');

const items = `[
  {label: 'Item One'},
  {label: 'Item Two'},
  {label: 'Item Three'},
  {label: 'Item Four'},
]`;

const MenuConfig: TConfig = {
  imports: {
    'baseui/menu': {
      named: ['StatefulMenu'],
    },
  },
  scope: {StatefulMenu},
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
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Option', 'List', 'EmptyState'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    StatefulMenu: menuProps,
  },
};

export default MenuConfig;
