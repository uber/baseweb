import {Unstable_AppNavBar} from 'baseui/app-nav-bar';
import {
  ChevronDown,
  Delete,
  Overflow,
  Upload
} from 'baseui/icon';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const navBarProps = require('!!extract-react-types-loader!../../../../src/app-nav-bar/app-nav-bar.js');

const NavigationBarConfig: TConfig = {
  componentName: 'Unstable_AppNavBar',
  imports: {
    'baseui/app-nav-bar': {
      named: ['Unstable_AppNavBar'],
    },
    'baseui/icon': {
      named: ['ChevronDown', 'Delete', 'Overflow', 'Upload'],
    },
  },
  scope: {
    Unstable_AppNavBar, 
    ChevronDown, 
    Delete,
    Overflow,
    Upload
  },
  theme: [],
  props: {
    appDisplayName: {
      value: '"Something App"',
      type: PropTypes.ReactNode,
      description: 'Navigation bar title, application name, or logo.',
    },
    appDisplayNameLink: {
      value: '#',
      type: PropTypes.String,
      description: 'Alternative text description of the image.',
    },
    onNavItemSelect: {
      value: '({item}) => console.log(item)',
      type: PropTypes.Function,
      description: 'Handler called when a menu item is selected.',
    },
    mainNav: {
      hidden: true,
      value: `[
        {
          icon: Upload, 
          item: {label: 'Primary alpha1'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
        },
        {
          icon: Upload, 
          item: {label: 'Primary alpha2'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
        },
        {
          active: true,
          icon: ChevronDown,
          item: {label: 'Primary alpha3'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
          navExitIcon: Delete,
          nav: [
            {
              icon: Upload, 
              item: {label: 'Secondary menu1'},
              mapItemToNode: item => item.label,
              mapItemToString: item => item.label,
            },
            {
              icon: Upload, 
              item: {label: 'Secondary menu2'},
              mapItemToNode: item => item.label,
              mapItemToString: item => item.label,
            },
          ],
        },
      ]`,
      type: PropTypes.Array,
      description:
        'List of the primary navigation items.',
    },
    username: {
      value: 'Umka Marshmallow',
      type: PropTypes.String,
      description: 'User profile name.',
    },
    usernameSubtitle: {
      value: '5.0',
      type: PropTypes.ReactNode,
      description: 'User profile description or additional information.',
    },
    userImgUrl: {
      value: '',
      type: PropTypes.String,
      description: 'User profile image link.',
    },
    userNav: {
      hidden: true,
      value: `[
        {
          icon: Overflow, 
          item: {label: 'Account item1'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
        },
        {
          icon: Overflow, 
          item: {label: 'Account item2'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
        },
        {
          icon: Overflow, 
          item: {label: 'Account item3'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
        },
        {
          icon: Overflow, 
          item: {label: 'Account item4'},
          mapItemToNode: item => item.label,
          mapItemToString: item => item.label,
        },
      ]`,
      type: PropTypes.Array,
      description: 'List of the user profile navigation items.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {},
    },
  },
  mapTokensToProps: {
    AppNavBar: navBarProps,
  },
};

export default NavigationBarConfig;
