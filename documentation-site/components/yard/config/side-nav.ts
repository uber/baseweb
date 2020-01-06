import {Navigation} from 'baseui/side-navigation';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const sideNavProps = require('!!extract-react-types-loader!../../../../src/side-navigation/nav.js');

const items = `[
  {
    title: 'Colors',
    itemId: '#colors',
    subNav: [
      {
        title: 'Primary',
        itemId: '#primary',
      },
      {
        title: 'Shades',
        itemId: '#shades',
        subNav: [
          {
            title: 'Dark',
            itemId: '#dark',
          },
        ]
      },
    ],
  },
]`;

const SideNavigationConfig: TConfig = {
  imports: {
    'baseui/side-navigation': {
      named: ['Navigation'],
    },
  },
  scope: {Navigation},
  theme: [],
  props: {
    items: {
      value: items,
      type: PropTypes.Array,
      description: 'Navigation items to render.',
    },
    activeItemId: {
      value: '#primary',
      type: PropTypes.String,
      description: 'Currently selected item id.',
      stateful: true,
    },
    onChange: {
      value: '({item}) => setActiveItemId(item.itemId)',
      type: PropTypes.Function,
      description: 'Called when item is clicked.',
      propHook: {
        what: 'item.itemId',
        into: 'activeItemId',
      },
    },
    activePredicate: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'Is called on the nav item render to test if the item is currently selected. If returns true, the item will be rendered as an active.',
    },
    mapItem: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Optional transform function that is called for each Item.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'NavItemContainer',
          'NavLink',
          'NavItem',
          'SubNavContainer',
        ],
        sharedProps: {
          $active: {
            type: PropTypes.Boolean,
            description: 'True if nav item is active.',
          },
          $level: {
            type: PropTypes.Number,
            description: 'Indicates the nav item nesting level.',
          },
          $selectable: {
            type: PropTypes.Boolean,
            description: 'True if the nav item is selectable.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    Navigation: sideNavProps,
  },
};

export default SideNavigationConfig;
