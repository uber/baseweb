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
        {icon: Upload, label: 'Primary alpha1'},
        {icon: Upload, label: 'Primary alpha2'},
        {
          icon: ChevronDown,
          label: 'Primary alpha3',
          nav: [
            {icon: Upload, label: 'Secondary menu1'},
            {icon: Upload, label: 'Secondary menu2'},
          ],
          subnavExitIcon: Delete,
        },
        {
          active: true,
          icon: ChevronDown,
          label: 'Primary alpha4',
          nav: [
            {
              icon: ChevronDown,
              label: 'Secondary menu1',
            },
            {icon: Upload, label: 'Secondary menu2'},
          ],
          subnavExitIcon: Delete,
        }
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
        {icon: Overflow, label: 'Account item1'},
        {icon: Overflow, label: 'Account item2'},
        {icon: Overflow, label: 'Account item3'},
        {icon: Overflow, label: 'Account item4'},
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
