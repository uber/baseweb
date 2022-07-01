/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Tabs, Tab } from '../index';

type StateT = {
  activeKey: string;
};

export class Scenario extends React.Component<{}, StateT> {
  state = {
    activeKey: '0',
  };

  onChange = (params: { activeKey: React.Key }) => {
    this.setState({ activeKey: String(params.activeKey) });
  };

  render() {
    const content = ['Tab Content 1', 'Tab Content 2', 'Tab Content 3'];
    return (
      <React.Fragment>
        <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
          <Tab title="Tab Link 1">
            <div>{content[Number(this.state.activeKey)]}</div>
          </Tab>
          <Tab title="Tab Link 2">
            <div>{content[Number(this.state.activeKey)]}</div>
          </Tab>
          <Tab title="Tab Link 3">
            <div>{content[Number(this.state.activeKey)]}</div>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}
