import * as React from 'react';
import {StatefulTabs, Tab, ORIENTATION} from 'baseui/tabs';

export default function TabsScroll() {
  return (
    <React.Fragment>
      <StatefulTabs
        overrides={{Root: {style: {maxWidth: '300px'}}}}
        orientation={ORIENTATION.horizontal}
      >
        <Tab title="Tab Link 1">One</Tab>
        <Tab title="Tab Link 2">Two</Tab>
        <Tab title="Tab Link 3">Three</Tab>
        <Tab title="Tab Link 4">Four</Tab>
        <Tab title="Tab Link 5">Five</Tab>
        <Tab title="Tab Link 6">Six</Tab>
        <Tab title="Tab Link 7">Seven</Tab>
      </StatefulTabs>
      <br />
      <StatefulTabs
        overrides={{Root: {style: {maxHeight: '150px'}}}}
        orientation={ORIENTATION.vertical}
      >
        <Tab title="Tab Link 1">One</Tab>
        <Tab title="Tab Link 2">Two</Tab>
        <Tab title="Tab Link 3">Three</Tab>
        <Tab title="Tab Link 4">Four</Tab>
        <Tab title="Tab Link 5">Five</Tab>
        <Tab title="Tab Link 6">Six</Tab>
        <Tab title="Tab Link 7">Seven</Tab>
      </StatefulTabs>
    </React.Fragment>
  );
}
