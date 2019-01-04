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
import {Popover, PLACEMENT} from '../popover/index.js';
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
    value: this.props.value || null,
    formattedValue: '',
  };

  formatDate(date) {
    if (this.props.isRange) {
      return date.map(day => formatDate(day, 'YYYY/MM/dd')).join(' - ');
    }
    return formatDate(date, 'YYYY/MM/dd');
  }

  onChange = ({date}) => {
    let isOpen = false;
    if (this.props.isRange && date.length < 2) {
      isOpen = true;
    }
    this.setState({
      value: date,
      formattedValue: this.formatDate(date),
      isOpen,
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
        placement={PLACEMENT.bottom}
        isOpen={this.state.isOpen}
        onEsc={this.close}
        content={
          <StatefulDatepicker
            initialState={{value: this.state.value}}
            isRange={this.props.isRange}
            onSelect={this.onChange}
          />
        }
      >
        <Input
          value={this.state.formattedValue}
          onFocus={this.open}
          // onBlur={this.close}
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
  [tests.STATEFUL_RANGE_IN_POPOVER]: function Story3() {
    return <DatepickerWithInput isRange value={[]} />;
  },

  [tests.WITH_OVERRIDES]: function Story3() {
    const selectOverrides = {
      ControlContainer: {
        style: ({$theme, $isFocused, $isPseudoFocused}) => ({
          backgroundColor:
            $isFocused || $isPseudoFocused
              ? $theme.colors.positive500
              : $theme.colors.positive,
        }),
      },
      OptionContent: {
        style: ({$theme, $isHighlighted}) => ({
          color: $isHighlighted
            ? $theme.colors.positive
            : $theme.colors.foreground,
        }),
      },
    };
    return (
      <StatefulDatepicker
        initialState={{value: new Date()}}
        overrides={{
          CalendarHeader: {
            style: ({$theme}) => ({
              backgroundColor: $theme.colors.positive,
            }),
          },
          MonthSelect: {
            props: {overrides: selectOverrides},
          },
          YearSelect: {
            props: {overrides: selectOverrides},
          },
          Day: {
            style: ({$theme, $selected, $isHovered, $isHighlighted}) => ({
              backgroundColor: $selected
                ? $theme.colors.positive
                : $isHovered || $isHighlighted
                  ? $theme.colors.positive100
                  : 'transparent',
            }),
          },
        }}
      />
    );
  },
};
