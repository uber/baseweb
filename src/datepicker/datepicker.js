/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {Input} from '../input/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import NavigationContainer from './navigation-container.js';
import Calendar from './calendar.js';
import {formatDate} from './utils/index.js';
import {getOverrides} from '../helpers/overrides.js';
import type {DatepickerPropsT} from './types.js';

export default class Datepicker extends React.Component<
  DatepickerPropsT,
  {isOpen: boolean},
> {
  static defaultProps = {
    formatDisplayValue: null,
    formatString: 'YYYY/MM/dd',
    onChange: () => {},
    overrides: {},
    placeholder: 'YYYY/MM/DD',
    value: null,
  };

  calendar: ?HTMLElement;

  state = {
    isOpen: false,
  };

  onChange = (data: {date: ?Date | Array<Date>}) => {
    const {date} = data;
    let isOpen = false;
    if (Array.isArray(date) && this.props.isRange && date.length < 2) {
      isOpen = true;
    }
    this.setState({
      isOpen,
    });
    this.props.onChange(data);
  };

  formatDate(date: ?Date | Array<Date>, formatString: string) {
    if (!date) {
      return '';
    } else if (Array.isArray(date)) {
      return date.map(day => formatDate(day, formatString)).join(' - ');
    } else {
      return formatDate(date, formatString);
    }
  }

  formatDisplayValue(date: ?Date | Array<Date>) {
    const formatDisplayValue = this.props.formatDisplayValue || this.formatDate;
    return formatDisplayValue(date, this.props.formatString);
  }

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
    const {overrides = {}} = this.props;
    const [InputC, inputProps] = getOverrides(overrides.Input, Input);
    const [PopoverC, popoverProps] = getOverrides(overrides.Popover, Popover);
    return (
      <PopoverC
        placement={PLACEMENT.bottom}
        isOpen={this.state.isOpen}
        onEsc={this.close}
        content={
          <NavigationContainer
            value={this.props.value}
            {...this.props}
            onChange={this.onChange}
          >
            {childrenProps => <Calendar {...childrenProps} />}
          </NavigationContainer>
        }
        {...popoverProps}
      >
        <InputC
          value={this.formatDisplayValue(this.props.value)}
          onFocus={this.open}
          onKeyDown={this.handleKeyDown}
          placeholder={this.props.placeholder}
          {...inputProps}
        />
      </PopoverC>
    );
  }
}
