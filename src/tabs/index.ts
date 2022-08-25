/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StatefulTabsState, SharedStylePropsArg } from './types';

export { default as Tabs } from './tabs';
export { default as StatefulTabs } from './stateful-tabs';
export { default as Tab } from './tab';
// Constants
export { ORIENTATION, STATE_CHANGE_TYPE } from './constants';
// Styled elements
export {
  Root as StyledRoot,
  Tab as StyledTab,
  TabBar as StyledTabBar,
  TabContent as StyledTabContent,
} from './styled-components';
// Flow
export * from './types';
/** @deprecated use StatefulTabsState instead. To be removed in future versions.*/
export type State = StatefulTabsState;
/** @deprecated use SharedStylePropsArg instead. To be removed in future versions.*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SharedProps = SharedStylePropsArg;
