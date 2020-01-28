/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {Checkbox} from '../index.js';

export const name = 'checkbox-indeterminate';

class GroupList extends React.Component<{}, {checkboxes: Array<boolean>}> {
  state = {checkboxes: [true, false]};

  render() {
    const allChecked = this.state.checkboxes.every(Boolean);
    const isIndeterminate = this.state.checkboxes.some(Boolean) && !allChecked;

    return (
      <Block>
        <Checkbox
          components={{}}
          onChange={e => {
            const nextCheckboxes = [e.target.checked, e.target.checked];
            this.setState({checkboxes: nextCheckboxes});
          }}
          isIndeterminate={isIndeterminate}
          checked={allChecked}
          overrides={{Root: {props: {'data-name': 'parent'}}}}
        >
          Indeterminate checkbox if not all subcheckboxes are checked
        </Checkbox>
        <Block padding="scale400">
          <Checkbox
            checked={this.state.checkboxes[0]}
            onChange={e => {
              const nextCheckboxes = [...this.state.checkboxes];
              nextCheckboxes[0] = e.target.checked;
              this.setState({checkboxes: nextCheckboxes});
            }}
            overrides={{Root: {props: {'data-name': 'child1'}}}}
          >
            First subcheckbox
          </Checkbox>
          <Checkbox
            checked={this.state.checkboxes[1]}
            onChange={e => {
              const nextCheckboxes = [...this.state.checkboxes];
              nextCheckboxes[1] = e.target.checked;
              this.setState({checkboxes: nextCheckboxes});
            }}
            overrides={{Root: {props: {'data-name': 'child2'}}}}
          >
            Second subcheckbox
          </Checkbox>
        </Block>
      </Block>
    );
  }
}

export const component = () => <GroupList />;
