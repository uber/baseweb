import {Tabs, Tab, ORIENTATION} from 'baseui/tabs';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const tabsProps = require('!!extract-react-types-loader!../../../../src/tabs/tabs.js');
const tabProps = require('!!extract-react-types-loader!../../../../src/tabs/tab.js');

const TabsConfig: TConfig = {
  imports: {
    'baseui/tabs': {named: ['Tabs']},
  },
  scope: {
    Tabs,
    Tab,
    ORIENTATION,
  },
  theme: ['tabBarFill', 'tabColor'],
  props: {
    children: {
      value: `<Tab title="Tab Link 1">
  Content 1
</Tab>
<Tab title="Tab Link 2">
  Content 2
</Tab>
<Tab title="Tab Link 3">
  Content 3
</Tab>`,
      type: PropTypes.ReactNode,
      description: `An array of Tab components.`,
      imports: {
        'baseui/tabs': {named: ['Tab']},
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
        'baseui/tabs': {named: ['ORIENTATION']},
      },
    },
    activeKey: {
      value: '0',
      type: PropTypes.String,
      description: 'Key of the the tab to be selected.',
      stateful: true,
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'True when all tabs are disabled.',
    },
    renderAll: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Renders all tab content for SEO purposes regardless of tab active state.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Tab', 'TabBar', 'TabContent'],
        sharedProps: {
          $disabled: 'disabled',
          $active: {
            type: PropTypes.Boolean,
            description: 'True when the tab is active.',
          },
          $orientation: 'orientation',
        },
      },
    },
  },
  mapTokensToProps: {
    Tabs: tabsProps,
    Tab: tabProps,
  },
};

export default TabsConfig;
