/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { BottomNavigation, NavItem } from 'baseui/bottom-navigation';
import Calendar from 'baseui/icon/calendar';
import Show from 'baseui/icon/show';
import Search from 'baseui/icon/search';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const BottomNavigationConfig: TConfig = {
  componentName: 'BottomNavigation',
  imports: {
    'baseui/bottom-navigation': {
      named: ['BottomNavigation'],
    },
  },
  scope: {
    BottomNavigation,
    NavItem,
    Calendar,
    Show,
    Search,
  },
  theme: [],
  props: {
    activeKey: {
      value: 0,
      type: PropTypes.Number,
      description: 'Key of the NavItem to be selected.',
      stateful: true,
    },
    children: {
      value: `<NavItem title="First" icon={Calendar}>
  <h1>First page</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua libero tempore, cum soluta nobis est eligendi optio.</p>
</NavItem>
<NavItem title="Second" icon={Search}>
<h1>Second page</h1>
<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.</p>
</NavItem>
<NavItem title="Third" icon={Show}>
<h1>Third page</h1>
<p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
</NavItem>`,
      type: PropTypes.ReactNode,
      description: `An array of NavItem components.`,
      imports: {
        'baseui/bottom-navigation': { named: ['NavItem'] },
      },
    },
    onChange: {
      value: '({ activeKey }) => {\n  setActiveKey(activeKey);\n}',
      type: PropTypes.Function,
      description: `Change handler that is called every time a new nav item is selected.`,
      propHook: {
        what: 'activeKey',
        into: 'activeKey',
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'SelectorList',
          'OverflowPanel',
          'OverflowPanelList',
          'OverflowTitle',
          'OverflowSelector',
        ],
        sharedProps: {},
      },
    },
  },
};

export default BottomNavigationConfig;
