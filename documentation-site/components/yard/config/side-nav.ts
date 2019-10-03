import {Navigation} from 'baseui/side-navigation';
import {PropTypes} from '../const';
import {TConfig} from '../types';

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
          {
            title: 'Light',
            itemId: '#light',
          },
        ]
      },
      {
        title: 'Sizing',
        itemId: '#sizing',
      },
      {
        title: 'Typography',
        itemId: '#typography',
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
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
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
};

export default SideNavigationConfig;
