/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export {default as Tabs} from './tabs.js';
export {default as StatefulTabs} from './stateful-tabs.js';
export {default as Tab} from './tab.js';
// Constants
export {ORIENTATION, STATE_CHANGE_TYPE} from './constants.js';
// Styled elements
export {
  Root as StyledRoot,
  Tab as StyledTab,
  TabBar as StyledTabBar,
  TabContent as StyledTabContent,
} from './styled-components.js';
// Flow
export * from './types';
