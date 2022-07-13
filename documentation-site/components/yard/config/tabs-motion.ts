/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Tabs, Tab, ORIENTATION, FILL } from 'baseui/tabs-motion';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const tabsProps = require('!!extract-react-types-loader!../../../../src/tabs-motion/tabs');
const tabProps = require('!!extract-react-types-loader!../../../../src/tabs-motion/tab');

const TabsConfig: TConfig = {
  componentName: 'Tabs',
  imports: {
    'baseui/tabs-motion': { named: ['Tabs'] },
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
    activeKey: {
      value: '0',
      type: PropTypes.String,
      description: 'Key of the the tab to be selected.',
      stateful: true,
    },
    children: {
      value: `<Tab title="First">
  Content 1
</Tab>
<Tab title="Second">
  Content 2
</Tab>
<Tab title="Third">
  Content 3
</Tab>`,
      type: PropTypes.ReactNode,
      description: `An array of Tab components.`,
      imports: {
        'baseui/tabs-motion': { named: ['Tab'] },
      },
    },
    onChange: {
      value: '({ activeKey }) => {\n  setActiveKey(activeKey);\n}',
      type: PropTypes.Function,
      description: `Change handler that is called every time a new tab is selected.`,
      propHook: {
        what: 'activeKey',
        into: 'activeKey',
      },
    },
    orientation: {
      value: 'ORIENTATION.horizontal',
      defaultValue: 'ORIENTATION.horizontal',
      type: PropTypes.Enum,
      options: ORIENTATION,
      description: 'The orientation of the tab component.',
      imports: {
        'baseui/tabs-motion': { named: ['ORIENTATION'] },
      },
    },
    fill: {
      value: 'FILL.intrinsic',
      defaultValue: 'FILL.intrinsic',
      type: PropTypes.Enum,
      options: FILL,
      description: 'Determines how Tabs fill the TabList.',
      imports: {
        'baseui/tabs-motion': { named: ['FILL'] },
      },
    },
    activateOnFocus: {
      value: true,
      type: PropTypes.Boolean,
      description: 'Activate tabs when they receive focus.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Disable all non-active tabs.',
    },
    renderAll: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders all tab content for SEO purposes regardless of tab active state.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'TabList', 'TabHighlight', 'TabBorder'],
        sharedProps: {
          $orientation: 'orientation',
          $fill: 'fill',
          $isActive: 'isActive',
        },
      },
    },
    uid: {
      value: undefined,
      type: PropTypes.String,
      description:
        'Unique id supplied to the Tabs component, and a prefix for the individual Tab components, to ensure both accessibility and SSR safety.',
    },
  },
  mapTokensToProps: {
    Tabs: tabsProps,
    Tab: tabProps,
  },
};

export default TabsConfig;
