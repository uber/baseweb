// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Checkbox} from 'baseui/checkbox';

class GroupList extends React.Component<
  {},
  {checkboxes: boolean[]},
> {
  state = {checkboxes: [false, false]};

  render() {
    const allChecked = this.state.checkboxes.every(Boolean);
    const isIndeterminate =
      this.state.checkboxes.some(Boolean) && !allChecked;

    return (
      <Block>
        <Checkbox
          components={{}}
          onChange={e => {
            const nextCheckboxes = [
              e.target.checked,
              e.target.checked,
            ];
            this.setState({checkboxes: nextCheckboxes});
          }}
          isIndeterminate={isIndeterminate}
          checked={allChecked}
        >
          Indeterminate checkbox if not all subcheckboxes are
          checked
        </Checkbox>
        <Block padding="scale400">
          <Checkbox
            checked={this.state.checkboxes[0]}
            onChange={e => {
              const nextCheckboxes = [...this.state.checkboxes];
              nextCheckboxes[0] = e.target.checked;
              this.setState({checkboxes: nextCheckboxes});
            }}
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
          >
            Second subcheckbox
          </Checkbox>
        </Block>
      </Block>
    );
  }
}

export default GroupList;
