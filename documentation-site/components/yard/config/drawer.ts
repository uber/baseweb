import {Drawer, ANCHOR, SIZE} from 'baseui/drawer';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const drawerProps = require('!!extract-react-types-loader!../../../../src/drawer/drawer.js');

const DrawerConfig: TConfig = {
  imports: {
    'baseui/drawer': {
      named: ['Drawer'],
    },
  },
  scope: {Drawer, ANCHOR, SIZE},
  theme: [],
  props: {
    animate: {
      value: undefined,
      defaultValue: true,
      type: PropTypes.Boolean,
      description:
        'Sets whether the Drawer should be displayed by easing in and out.',
      hidden: true,
    },
    isOpen: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Determines if the drawer is open.',
      stateful: true,
    },
    autoFocus: {
      value: true,
      type: PropTypes.Boolean,
      description:
        'If true, focus will shift to the first interactive element within the drawer.',
      hidden: true,
    },
    children: {
      value: '<div>drawer content</div>',
      type: PropTypes.ReactNode,
      description: 'Drawer content.',
    },
    onClose: {
      value: '() => setIsOpen(false);',
      type: PropTypes.Function,
      description: 'A callback that is invoked when the modal will close.',
      propHook: {
        what: 'false',
        into: 'isOpen',
      },
    },
    size: {
      value: 'SIZE.default',
      options: SIZE,
      defaultValue: 'SIZE.default',
      type: PropTypes.Enum,
      description: 'Defines the modal size.',
      imports: {
        'baseui/drawer': {
          named: ['SIZE'],
        },
      },
    },
    anchor: {
      value: 'ANCHOR.default',
      options: ANCHOR,
      defaultValue: 'ANCHOR.default',
      type: PropTypes.Enum,
      description: 'Window side from which the drawer originates from.',
      imports: {
        'baseui/drawer': {
          named: ['ANCHOR'],
        },
      },
    },
    closeable: {
      value: true,
      defaultValue: true,
      type: PropTypes.Boolean,
      description: 'Whether the drawer should be closeable by the user.',
      hidden: true,
    },
    showBackdrop: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Whether the backdrop should be shown.',
      hidden: true,
    },
    onBackdropClick: {
      value: false,
      type: PropTypes.Function,
      description: 'Callback invoked when backdrop is clicked.',
      hidden: true,
    },
    onEscapeKeyDown: {
      value: false,
      type: PropTypes.Function,
      description: 'Callback invoked when escape key is pressed.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Backdrop', 'DrawerBody', 'DrawerContainer', 'Close'],
        sharedProps: {
          $animating: {
            type: PropTypes.Boolean,
            description: 'True if drawer is animating.',
          },
          $isVisible: {
            type: PropTypes.Boolean,
            description: 'True if drawer is visible.',
          },
          $isOpen: 'isOpen',
          $size: 'size',
          $closeable: 'closeable',
          $anchor: 'anchor',
        },
      },
    },
  },
  mapTokensToProps: {
    Drawer: drawerProps,
  },
};

export default DrawerConfig;
