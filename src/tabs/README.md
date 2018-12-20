# Tabs Component

## Usage

### Basic usage

```js
import * as React from 'react';
import {StatefulTabs, TabPanel} from 'baseui/tabs';

export default () => {
  return (
    <div>
      <StatefulTabs initialState={{activeKey: '1'}}>
        <TabPanel title="Tab 1">Tab 1 Content</Tab>
        <TabPanel title="Tab 2">Tab 2 Content</Tab>
        <TabPanel title="Tab 3">Tab 3 Content</Tab>
      </StatefulTabs>
    </div>
)};
```

### Advanced usage

```js
import * as React from 'react';
import {Tabs, TabPanel, StyledTabBar, StyledTabContent, StyledTab, ORIENTATION} from 'baseui/tabs';
import {styled} from 'baseui';

const CustomTabBar = styled(StyledTabBar, props => ({
  backgroundColor: 'yellow'
}));

const CustomTabContent = styled(StyledTabContent, props => ({
  padding: '10px',
  color: 'red',
}));

const overrides = {
  TabBar: CustomTabBar,
  TabContent: CustomTabContent
};

const CustomTab = styled(StyledTab, props => ({
  borderBottom: props.$active ? `2px solid green` : 'none',
}));

const tabOverrides = {
  Tab: CustomTab
};

export default () => {
  return (
    <div>
      <StatefulTabs orientation={ORIENTATION.vertical} initialState={{activeKey: '1'}} overrides={overrides}>
        <TabPanel key="1" title="Tab 1" overrides={tabOverrides}>Tab 1 Content</TabPanel>
        <TabPanel key="2" title="Tab 2" overrides={tabOverrides}>Tab 2 Content</TabPanel>
        <TabPanel key="3" title="Tab 3" overrides={tabOverrides}>Tab 3 Content</TabPanel>
      </StatefulTabs>
    </div>
)};
```

## Exports

* `Tabs`
* `StatefulTabs`
* `TabPanel`
* `StyledTab`
* `StyledTabBar`
* `StyledTabContent`
* `StyledRoot`
* `ORIENTATION`
* `STATE_CHANGE_TYPE`

## `Tabs` API

* `children: Array<TabPanel>` - Required.
  An array of TabPanel items.
* `activeKey: string` - Required.
  Key of the the tab to be selected.
* `disabled: boolean` - Optional. Default is `false`
  If set to `true` all its tabs will be disabled
* `orientation: $Values<typeof ORIENTATION>` - Optional. Defaults to ORIENTATION.horizontal
* `overrides: {Root, TabContent, TabBar}` - Optional.
  Overrides for presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `onChange: ({activeKey: string>})` - Optional.
  onChange handler that is called every time a new tab is selected

## `StatefulTabs` API

* `children: Array<TabPanel>` - Required.
  An array of TabPanel items.
* `initialState: {activeKey: string}` - Optional.
  Initial state of the component where `activeKey` is the key of the tab to be selected by default. Defaults to the key of the first `TabPanel`.
* `disabled: boolean` - Optional. Default is `false`
  If set to `true` all its tabs will be disabled
* `orientation: $Values<typeof ORIENTATION>` - Optional. Defaults to ORIENTATION.horizontal
* `overrides: {Root, TabContent, TabBar}` - Optional.
  Overrides for presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `onChange: ({activeKey: string>})` - Optional.
  onChange handler that is called every time a new tab is selected
* `stateReducer: (type: string, nextState: {activeKey: string}, currentState: {activeKey: string}) => stateToSet: {activeKey: string}` - Optional.
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with

## `TabPanel` API

* `title: React$Node` - Required.
  Title of the Tab to be shown in the Tab bar.
* `children: React$Node` - Optional.
  Content of the tab to be shown when it is selected. (Can be omitted if using `Tabs` as an externally controlled component for example)
* `key: string` - Optional.
  Unique key for the tab. Defaults to the child index.
* `disabled: boolean` Optional.
  Defaults to the `disabled` value passed from the parent`Tabs` component
* `onSelect: () => {}` - Optional.
  onSelect handler for the `Tab` element
* `onClick: (event) => {}` - Optional.
  onClick handler for the `Tab` element
* `onKeyDown: (event) => {}` - Optional.
  onKeyDown handler for the `Tab` element
* `overrides: {Tab}` - Optional
  Overrides for Tab's presentational components. See "Presentational Components Props API" below
  * [ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional

## Presentational components props API

These properties are passed to presentational (styled) components that are exported:

* `$disabled: boolean` If the Tabs component (or an individual tab) is disabled
* `$active: boolean` If a particular Tab is active
* `$orientation: string` Orientation of the tab bar (either ORIENTATION.horizontal or ORIENTATION.vertical)

## STATE_CHANGE_TYPE Constant

* `change` - The active tab is changed (a new tab has been selected)

## ORIENTATION Constant

* `horizontal`
* `vertical`

## Accessibility

`tab`, `shift + tab` - to move focus between tabs.

`Space` or `Enter` - to display the selected tab's content

`aria-selected`, `aria-disabled` are applied to the tabs.

Roles: `role=tab`, `role=tablist`,  `role=tabpanel`

Refer [https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html)