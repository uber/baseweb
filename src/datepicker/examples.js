/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  Unstable_Calendar as Datepicker,
  Unstable_StatefulCalendar as StatefulDatepicker,
  formatDate,
} from './index.js';
import {Popover} from '../popover/index.js';
import {Input} from '../input/index.js';
import tests from './examples-list.js';

export const suite = 'Component Test Suite';

class DatepickerWithInput extends React.Component<
  {},
  {
    isOpen: boolean,
    value: ?Date,
    formattedValue: string,
  },
> {
  state = {
    isOpen: false,
    value: null,
    formattedValue: '',
  };

  onChange = ({date}) => {
    this.setState({
      value: date,
      formattedValue: formatDate(date, 'YYYY/MM/dd'),
      isOpen: false,
    });
  };

  open = () => {
    this.setState({isOpen: true});
  };

  close = () => {
    this.setState({isOpen: false});
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.state.isOpen && event.keyCode === 40) {
      this.open();
    }
  };

  render() {
    return (
      <Popover
        isOpen={this.state.isOpen}
        onEsc={this.close}
        content={<StatefulDatepicker onSelect={this.onChange} />}
      >
        <Input
          value={this.state.formattedValue}
          onFocus={this.open}
          onBlur={this.close}
          // Change the on key event types in Input
          // $FlowFixMe
          onKeyDown={this.handleKeyDown}
          placeholder="YYYY/MM/DD"
        />
      </Popover>
    );
  }
}

export default {
  [tests.SIMPLE_EXAMPLE]: function Story1() {
    return <Datepicker />;
  },
  [tests.STATEFUL_EXAMPLE]: function Story2() {
    return <StatefulDatepicker />;
  },
  [tests.STATEFUL_IN_POPOVER]: function Story3() {
    return <DatepickerWithInput />;
  },
};
