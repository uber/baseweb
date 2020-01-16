/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import isValid from 'date-fns/isValid/index.js';
import isAfter from 'date-fns/isAfter/index.js';

import {MaskedInput} from '../input/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import Calendar from './calendar.js';
import {formatDate} from './utils/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import {StyledInputWrapper} from './styled-components.js';
import type {DatepickerPropsT} from './types.js';

export default class Datepicker extends React.Component<
  DatepickerPropsT,
  {
    calendarFocused: boolean,
    isOpen: boolean,
    isPseudoFocused: boolean,
    lastActiveElm: ?HTMLElement,
    inputValue?: string,
    isInputUsed?: boolean,
  },
> {
  static defaultProps = {
    'aria-describedby': 'datepicker--screenreader--message--input',
    value: null,
  };

  calendar: ?HTMLElement;

  state = {
    calendarFocused: false,
    isOpen: false,
    isPseudoFocused: false,
    lastActiveElm: null,
    inputValue: this.formatDisplayValue(this.props.value) || '',
    isInputUsed: false,
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
      inputValue: this.formatDisplayValue(date),
    });
    this.props.onChange && this.props.onChange(data);
  };

  formatDate(date: ?Date | Array<Date>, formatString: string) {
    if (!date) {
      return '';
    } else if (Array.isArray(date) && (!date[0] && !date[1])) {
      return '';
    } else if (Array.isArray(date)) {
      return date
        .map(day => formatDate(day, formatString, this.props.locale))
        .join(' – ');
    } else {
      return formatDate(date, formatString, this.props.locale);
    }
  }

  formatDisplayValue(date: ?Date | Array<Date>) {
    let formatDisplayValue = this.props.formatDisplayValue || this.formatDate;
    formatDisplayValue = formatDisplayValue.bind(this);
    return formatDisplayValue(date, this.props.formatString || 'yyyy/MM/dd');
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

  getMask = () => {
    const {formatString} = this.props;
    let mask = '';
    if (this.props.mask !== null) {
      mask =
        // using the mask provided through the top-level API
        this.props.mask ||
        // to make sure it's not a breaking change, we try calculating the input mask
        // from the formatString, if used by the developer

        // 1. mask generation from the formatstring if it's a range input
        (formatString && this.props.range
          ? `${formatString} – ${formatString}`.replace(/[a-z]/gi, '9')
          : null) ||
        // 2. mask generation from the formatstring if it is NOT a range input
        (formatString ? formatString.replace(/[a-z]/gi, '9') : null) ||
        // falling back to the default masks
        (this.props.range ? '9999/99/99 – 9999/99/99' : '9999/99/99');
    }
    return mask;
  };

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    if (
      inputValue === this.getMask().replace(/9/g, ' ') ||
      inputValue.length === 0
    ) {
      if (this.props.range) {
        this.props.onChange &&
          this.props.onChange({
            date: [],
          });
      } else {
        this.props.onChange &&
          this.props.onChange({
            date: null,
          });
      }
    }

    this.setState({
      inputValue,
      isInputUsed: true,
    });

    if (this.props.range) {
      const dates = this.normalizeDashes(inputValue).split(' – ');
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);
      isValid(startDate) &&
        isValid(endDate) &&
        isAfter(endDate, startDate) &&
        this.props.onChange &&
        this.props.onChange({
          date: [startDate, endDate],
        });
    } else {
      const date = new Date(inputValue);
      isValid(date) &&
        this.props.onChange &&
        this.props.onChange({
          date,
        });
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

  normalizeDashes = (inputValue: string) => {
    // replacing both hyphens and em-dashes with en-dashs
    return inputValue.replace(/-/g, '–').replace(/—/g, '–');
  };

  componentDidUpdate(prevProps: DatepickerPropsT) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        inputValue: this.formatDisplayValue(this.props.value),
      });
    }
  }

  render() {
    const {overrides = {}} = this.props;
    const [InputComponent, inputProps] = getOverrides(
      overrides.Input,
      MaskedInput,
    );
    const [PopoverComponent, popoverProps] = getOverrides(
      overrides.Popover,
      Popover,
    );
    const [InputWrapper, inputWrapperProps] = getOverrides(
      overrides.InputWrapper,
      StyledInputWrapper,
    );

    const placeholder =
      this.props.placeholder ||
      (this.props.range ? 'YYYY/MM/DD – YYYY/MM/DD' : 'YYYY/MM/DD');

    return (
      <LocaleContext.Consumer>
        {locale => (
          <React.Fragment>
            <PopoverComponent
              mountNode={this.props.mountNode}
              placement={PLACEMENT.bottom}
              isOpen={this.state.isOpen}
              onClickOutside={this.close}
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
              <InputWrapper {...inputWrapperProps}>
                <InputComponent
                  aria-disabled={this.props.disabled}
                  aria-label={
                    this.props['aria-label'] || locale.datepicker.ariaLabel
                  }
                  error={this.props.error}
                  positive={this.props.positive}
                  aria-labelledby={this.props['aria-labelledby']}
                  aria-describedby={this.props['aria-describedby']}
                  aria-required={this.props.required || null}
                  disabled={this.props.disabled}
                  size={this.props.size}
                  value={this.state.inputValue}
                  onFocus={this.open}
                  onBlur={this.handleInputBlur}
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleInputChange}
                  placeholder={placeholder}
                  mask={this.getMask()}
                  required={this.props.required}
                  clearable={this.props.clearable}
                  {...inputProps}
                />
              </InputWrapper>
            </PopoverComponent>
            <p
              id={this.props['aria-describedby']}
              style={{
                position: 'fixed',
                width: '1px',
                height: '1px',
                margin: '-1px',
                border: 0,
                padding: 0,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
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
