import { Tabs, Tab, ORIENTATION, FILL } from 'baseui/tabs-motion';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

// This is only used for the props table atm.

const tabProps = require('!!extract-react-types-loader!../../../../src/tabs-motion/tab.js');

const TabConfig: TConfig = {
  componentName: 'Tab',
  imports: {
    'baseui/tabs-motion': { named: ['Tab'] },
  },
  scope: {
    Tabs,
    Tab,
    ORIENTATION,
    FILL,
  },
  theme: [
    'accent',
    'borderOpaque',
    'borderSelected',
    'contentPrimary',
    'backgroundPrimary',
    'contentStateDisabled',
  ],
  props: {
    title: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: 'The content of the Tab.',
    },
    tabRef: {
      value: undefined,
      type: PropTypes.Ref,
      description: 'Use to pass a ref to the Tab.',
    },
    artwork: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: 'Optional leading icon or content.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Tab', 'ArtworkContainer', 'TabPanel'],
        sharedProps: {
          $orientation: 'orientation',
          $fill: 'fill',
        },
      },
    },
    children: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: `The content of the TabPanel.`,
    },
  },
  mapTokensToProps: {
    Tab: tabProps,
  },
};

export default TabConfig;
