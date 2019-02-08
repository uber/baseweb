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
  {
    calendarFocused: boolean,
    isOpen: boolean,
    isPseudoFocused: boolean,
    lastActiveElm: ?HTMLElement,
  },
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
    calendarFocused: false,
    isOpen: false,
    isPseudoFocused: false,
    lastActiveElm: null,
  };

  onChange = (data: {date: ?Date | Array<Date>}) => {
    const {date} = data;
    let isOpen = false;
    let isPseudoFocused = false;
    let calendarFocused = false;
    if (Array.isArray(date) && this.props.isRange && date.length < 2) {
      isOpen = true;
      isPseudoFocused = true;
      calendarFocused = null;
    } else if (this.state.lastActiveElm) {
      this.state.lastActiveElm.focus();
    }
    this.setState({
      isOpen,
      isPseudoFocused,
      ...(calendarFocused === null ? {} : {calendarFocused}),
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
    // console.log('input Focus');
    this.setState({
      isOpen: true,
      isPseudoFocused: true,
    });
  };

  close = () => {
    const isPseudoFocused = false;
    this.setState({
      isOpen: false,
      isPseudoFocused,
      calendarFocused: false,
    });
  };

  handleEsc = () => {
    if (this.state.lastActiveElm) {
      this.state.lastActiveElm.focus();
    }
    this.close();
  };

  handleInputBlur = () => {
    if (!this.state.isPseudoFocused) {
      this.close();
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.state.isOpen && event.keyCode === 40) {
      this.open();
    } else if (this.state.isOpen && event.key === 'ArrowDown') {
      // next line prevents the page jump on the initial arrowDown
      event.preventDefault();
      this.focusCalendar();
    } else if (this.state.isOpen && event.keyCode === 9) {
      this.close();
    }
  };

  focusCalendar = () => {
    if (__BROWSER__) {
      const lastActiveElm = document.activeElement;
      this.setState({
        calendarFocused: true,
        lastActiveElm,
      });
    }
  };

  render() {
    const {overrides = {}} = this.props;
    const [InputComponent, inputProps] = getOverrides(overrides.Input, Input);
    const [PopoverComponent, popoverProps] = getOverrides(
      overrides.Popover,
      Popover,
    );
    return (
      <PopoverComponent
        placement={PLACEMENT.bottom}
        isOpen={this.state.isOpen}
        onClickOutside={this.close}
        onEsc={this.handleEsc}
        content={
          <NavigationContainer
            trapTabbing={true}
            value={this.props.value}
            calFocusedInitially={this.state.calendarFocused}
            {...this.props}
            onChange={this.onChange}
          >
            {childrenProps => <Calendar {...childrenProps} />}
          </NavigationContainer>
        }
        {...popoverProps}
      >
        <InputComponent
          value={this.formatDisplayValue(this.props.value)}
          onFocus={this.open}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleKeyDown}
          placeholder={this.props.placeholder}
          {...inputProps}
        />
      </PopoverComponent>
    );
  }
}
