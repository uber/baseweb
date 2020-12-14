import {AppNavBar, setItemActive} from 'baseui/app-nav-bar';
import {ChevronDown, Delete, Overflow, Upload} from 'baseui/icon';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const navBarProps = require('!!extract-react-types-loader!../../../../src/app-nav-bar/app-nav-bar.js');

const NavigationBarConfig: TConfig = {
  componentName: 'AppNavBar',
  imports: {
    'baseui/app-nav-bar': {
      named: ['AppNavBar', 'setItemActive'],
    },
    'baseui/icon': {
      named: ['ChevronDown', 'Delete', 'Overflow', 'Upload'],
    },
  },
  scope: {
    AppNavBar,
    setItemActive,
    ChevronDown,
    Delete,
    Overflow,
    Upload,
  },
  theme: [],
  props: {
    title: {
      value: '"Title"',
      type: PropTypes.ReactNode,
      description: 'Navigation bar title, application name, or logo.',
    },

    mainItems: {
      value: `[
        {icon: Upload, label: 'Main A'},
        {
          active: true,
          icon: ChevronDown,
          label: 'Main B',
          navExitIcon: Delete,
          children: [
            {icon: Upload, label: 'Secondary A'},
            {icon: Upload, label: 'Secondary B'},
          ],
        },
      ]`,
      type: PropTypes.Array,
      description: 'List of the primary navigation items.',
      stateful: true,
      hidden: true,
    },

    onMainItemSelect: {
      value:
        '(item) => {\n setMainItems(prev =>\n   setItemActive(prev, item)\n )\n}',
      type: PropTypes.Function,
      description: 'Handler called when a menu item is selected.',
    },

    username: {
      value: 'Umka Marshmallow',
      type: PropTypes.String,
      description: 'User profile name.',
    },

    usernameSubtitle: {
      value: '"5 Stars"',
      type: PropTypes.ReactNode,
      description: 'User profile description or additional information.',
    },

    userImgUrl: {
      value: '',
      type: PropTypes.String,
      description: 'User profile image link.',
    },

    userItems: {
      hidden: true,
      value: `[
        {
          icon: Overflow,
          label: 'User A',
        },
        {
          icon: Overflow,
          label: 'User B',
        },
      ]`,
      type: PropTypes.Array,
      description: 'List of the user profile navigation items.',
    },

    onUserItemSelect: {
      value: 'item => console.log(item)',
      type: PropTypes.Function,
      description: 'Handler called when a menu item is selected.',
    },

    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'AppName',
          'MainMenuItem',
          'PrimaryMenuContainer',
          'ProfileTileContainer',
          'SecondaryMenuContainer',
          'Spacing',
          'SubnavContainer',
          'UserMenuProfileListItem',
          'UserProfileInfoContainer',
          'UserProfilePictureContainer',
          'UserProfileTileContainer',
        ],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    AppNavBar: navBarProps,
  },
};

export default NavigationBarConfig;
