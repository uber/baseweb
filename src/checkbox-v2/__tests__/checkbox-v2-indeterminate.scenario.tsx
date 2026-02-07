/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block } from '../../block';
import { Checkbox } from '../';

class GroupList extends React.Component<
  {},
  {
    checkboxes: Array<boolean>;
  }
> {
  state = { checkboxes: [true, false] };

  render() {
    const allChecked = this.state.checkboxes.every(Boolean);
    const isIndeterminate = this.state.checkboxes.some(Boolean) && !allChecked;

    return (
      <Block>
        <Checkbox
          onChange={(e) => {
            const nextCheckboxes = [e.target.checked, e.target.checked];
            this.setState({ checkboxes: nextCheckboxes });
          }}
          isIndeterminate={isIndeterminate}
          checked={allChecked}
          overrides={{ Root: { props: { 'data-name': 'parent' } } }}
          id="parent-checkbox"
          aria-controls="child1-checkbox child2-checkbox"
        >
          Indeterminate checkbox if not all subcheckboxes are checked
        </Checkbox>
        {/* Adding alignItems:flex-start to avoid items stretching */}
        <Block padding="scale400" display="flex" flexDirection="column" alignItems="flex-start">
          <Checkbox
            checked={this.state.checkboxes[0]}
            onChange={(e) => {
              const nextCheckboxes = [...this.state.checkboxes];
              nextCheckboxes[0] = e.target.checked;
              this.setState({ checkboxes: nextCheckboxes });
            }}
            overrides={{ Root: { props: { 'data-name': 'child1' } } }}
            id="child1-checkbox"
          >
            First subcheckbox
          </Checkbox>
          <Checkbox
            checked={this.state.checkboxes[1]}
            onChange={(e) => {
              const nextCheckboxes = [...this.state.checkboxes];
              nextCheckboxes[1] = e.target.checked;
              this.setState({ checkboxes: nextCheckboxes });
            }}
            overrides={{ Root: { props: { 'data-name': 'child2' } } }}
            id="child2-checkbox"
          >
            Second subcheckbox
          </Checkbox>
        </Block>
      </Block>
    );
  }
}

export function Scenario() {
  return <GroupList />;
}
