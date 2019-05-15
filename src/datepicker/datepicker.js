/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {Input} from '../input/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import Calendar from './calendar.js';
import {formatDate} from './utils/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
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
    'aria-label': null,
    'aria-labelledby': null,
    'aria-describedby': 'datepicker--screenreader--message--input',
    disabled: false,
    error: false,
    formatDisplayValue: null,
    formatString: 'YYYY/MM/dd',
    onChange: () => {},
    overrides: {},
    placeholder: 'YYYY/MM/DD',
    required: false,
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
    if (Array.isArray(date) && this.props.range && date.length < 2) {
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
    this.setState({
      isOpen: true,
      isPseudoFocused: true,
    });
  };

  close = () => {
    const isPseudoFocused = false;
    this.setState(
      {
        isOpen: false,
        isPseudoFocused,
        calendarFocused: false,
      },
      this.props.onClose,
    );
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
      <LocaleContext.Consumer>
        {locale => (
          <React.Fragment>
            <PopoverComponent
              mountNode={this.props.mountNode}
              placement={PLACEMENT.bottom}
              isOpen={this.state.isOpen}
              onClickOutside={event => {
                // Required to check that items rendered in a sub-popover does not trigger close.
                // For example, upon selecting an option from the month dropdown it would cause
                // this code to run since the two popovers are DOM siblings rather than parent/child.
                // There's likely a more robust way to check this, but ignores clicks from elements
                // that are select options for now.
                function isOption(element) {
                  if (!element) return false;
                  return element.getAttribute('role') === 'option';
                }
                if (
                  isOption(event.target) ||
                  isOption(event.target.parentElement)
                ) {
                  return;
                }

                this.close();
              }}
              onEsc={this.handleEsc}
              content={
                <Calendar
                  autoFocusCalendar={this.state.calendarFocused}
                  trapTabbing={true}
                  value={this.props.value}
                  {...this.props}
                  onChange={this.onChange}
                />
              }
              {...popoverProps}
            >
              <InputComponent
                aria-disabled={this.props.disabled}
                aria-label={
                  this.props['aria-label'] || locale.datepicker.ariaLabel
                }
                error={this.props.error}
                aria-labelledby={this.props['aria-labelledby']}
                aria-describedby={this.props['aria-describedby']}
                aria-required={this.props.required || null}
                disabled={this.props.disabled}
                value={this.formatDisplayValue(this.props.value)}
                onFocus={this.open}
                onBlur={this.handleInputBlur}
                onKeyDown={this.handleKeyDown}
                placeholder={this.props.placeholder}
                required={this.props.required}
                {...inputProps}
              />
            </PopoverComponent>
            <p
              id="datepicker--screenreader--message--input"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                margin: '-1px',
                border: '0px',
                padding: '0px',
                overflow: 'hidden',
                clip: 'react(0px, 0px, 0px, 0px)',
                clipPath: 'inset(100%)',
              }}
            >
              {locale.datepicker.screenReaderMessageInput}
            </p>
          </React.Fragment>
        )}
      </LocaleContext.Consumer>
    );
  }
}
