/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {MaskedInput} from '../input/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import Calendar from './calendar.js';
import {getOverrides} from '../helpers/overrides.js';
import getInterpolatedString from '../helpers/i18n-interpolation.js';
import {LocaleContext} from '../locale/index.js';
import {StyledInputWrapper} from './styled-components.js';
import type {DatepickerPropsT} from './types.js';
import DateHelpers from './utils/date-helpers.js';
import dateFnsAdapter from './utils/date-fns-adapter.js';

type StateT = {|
  calendarFocused: boolean,
  isOpen: boolean,
  isPseudoFocused: boolean,
  lastActiveElm: ?HTMLElement,
  inputValue?: string,
|};
export const DEFAULT_DATE_FORMAT = 'yyyy/MM/dd';

export default class Datepicker<T = Date> extends React.Component<
  DatepickerPropsT<T>,
  StateT,
> {
  static defaultProps = {
    'aria-describedby': 'datepicker--screenreader--message--input',
    value: null,
    formatString: DEFAULT_DATE_FORMAT,
    adapter: dateFnsAdapter,
  };

  calendar: ?HTMLElement;

  dateHelpers: DateHelpers<T>;

  constructor(props: DatepickerPropsT<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
    this.state = {
      calendarFocused: false,
      isOpen: false,
      isPseudoFocused: false,
      lastActiveElm: null,
      inputValue: this.formatDisplayValue(props.value) || '',
    };
  }

  onChange: ({date: ?T | Array<T>}) => void = data => {
    let isOpen = false;
    let isPseudoFocused = false;
    let calendarFocused = false;
    let nextDate = data.date;

    if (Array.isArray(nextDate) && this.props.range) {
      if (nextDate.length < 2) {
        isOpen = true;
        isPseudoFocused = true;
        calendarFocused = null;
      } else if (nextDate.length === 2) {
        const [start, end] = nextDate;
        if (this.dateHelpers.isAfter(start, end)) {
          nextDate = [start, start];
        }

        if (this.state.lastActiveElm) {
          this.state.lastActiveElm.focus();
        }
      }
    } else if (this.state.lastActiveElm) {
      this.state.lastActiveElm.focus();
    }

    // Time selectors previously caused the calendar popover to close.
    // The check below refrains from closing the popover if only times changed.
    const onlyTimeChanged = (prev: ?T, next: ?T) => {
      if (!prev || !next) return false;
      const p = this.dateHelpers.format(prev, 'keyboardDate');
      const n = this.dateHelpers.format(next, 'keyboardDate');
      if (p === n) {
        return (
          this.dateHelpers.getHours(prev) !== this.dateHelpers.getHours(next) ||
          this.dateHelpers.getMinutes(prev) !==
            this.dateHelpers.getMinutes(next)
        );
      }
      return false;
    };

    const prevValue = this.props.value;
    if (Array.isArray(nextDate) && Array.isArray(prevValue)) {
      if (nextDate.some((d, i) => onlyTimeChanged(prevValue[i], d))) {
        isOpen = true;
      }
    } else if (!Array.isArray(nextDate) && !Array.isArray(prevValue)) {
      if (onlyTimeChanged(prevValue, nextDate)) {
        isOpen = true;
      }
    }

    this.setState({
      isOpen,
      isPseudoFocused,
      ...(calendarFocused === null ? {} : {calendarFocused}),
      inputValue: this.formatDisplayValue(nextDate),
    });

    this.props.onChange && this.props.onChange({date: nextDate});
  };

  formatDate(date: ?T | Array<T>, formatString: string) {
    const format = date => {
      if (formatString === DEFAULT_DATE_FORMAT) {
        return this.dateHelpers.format(date, 'slashDate', this.props.locale);
      }
      return this.dateHelpers.formatDate(date, formatString, this.props.locale);
    };
    if (!date) {
      return '';
    } else if (Array.isArray(date) && !date[0] && !date[1]) {
      return '';
    } else if (Array.isArray(date)) {
      return date.map(day => format(day)).join(' – ');
    } else {
      return format(date);
    }
  }

  formatDisplayValue: (?T | Array<T>) => string = (date: ?T | Array<T>) => {
    const {displayValueAtRangeIndex, formatDisplayValue, range} = this.props;
    const formatString = this.normalizeDashes(this.props.formatString);

    if (typeof displayValueAtRangeIndex === 'number') {
      if (__DEV__) {
        if (!range) {
          console.error('displayValueAtRangeIndex only applies if range');
        }
        if (range && displayValueAtRangeIndex > 1) {
          console.error('displayValueAtRangeIndex value must be 0 or 1');
        }
      }
      if (date && Array.isArray(date)) {
        const value = date[displayValueAtRangeIndex];
        if (formatDisplayValue) {
          return formatDisplayValue(value, formatString);
        }
        return this.formatDate(value, formatString);
      }
    }

    if (formatDisplayValue) {
      return formatDisplayValue(date, formatString);
    }

    return this.formatDate(date, formatString);
  };

  open = () => {
    this.setState({
      isOpen: true,
      isPseudoFocused: true,
      calendarFocused: false,
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
    const {formatString, mask, range} = this.props;

    if (mask === null) {
      return null;
    }

    if (mask) {
      return this.normalizeDashes(mask);
    }

    const normalizedFormatString = this.normalizeDashes(formatString);
    if (formatString) {
      if (range) {
        return `${normalizedFormatString} – ${normalizedFormatString}`.replace(
          /[a-z]/gi,
          '9',
        );
      } else {
        return normalizedFormatString.replace(/[a-z]/gi, '9');
      }
    }

    if (range) {
      return '9999/99/99 – 9999/99/99';
    }

    return '9999/99/99';
  };

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const mask = this.getMask();

    if (
      (typeof mask === 'string' && inputValue === mask.replace(/9/g, ' ')) ||
      inputValue.length === 0
    ) {
      if (this.props.onChange) {
        if (this.props.range) {
          this.props.onChange({date: []});
        } else {
          this.props.onChange({date: null});
        }
      }
    }

    this.setState({inputValue});

    const formatString = this.normalizeDashes(this.props.formatString);
    const parseDateString = dateString => {
      if (formatString === DEFAULT_DATE_FORMAT) {
        return this.dateHelpers.parse(
          dateString,
          'slashDate',
          this.props.locale,
        );
      }
      return this.dateHelpers.parseString(
        dateString,
        formatString,
        this.props.locale,
      );
    };

    if (
      this.props.range &&
      typeof this.props.displayValueAtRangeIndex !== 'number'
    ) {
      const [left, right] = this.normalizeDashes(inputValue).split(' – ');

      let startDate = this.dateHelpers.date(left);
      let endDate = this.dateHelpers.date(right);

      if (formatString) {
        startDate = parseDateString(left);
        endDate = parseDateString(right);
      }

      const onChange = this.props.onChange;
      if (onChange) {
        const datesValid =
          this.dateHelpers.isValid(startDate) &&
          this.dateHelpers.isValid(endDate);

        // added equal case so that times within the same day can be expressed
        const rangeValid =
          this.dateHelpers.isAfter(endDate, startDate) ||
          this.dateHelpers.isEqual(startDate, endDate);

        if (datesValid && rangeValid) {
          onChange({date: [startDate, endDate]});
        }
      }
    } else {
      const dateString = this.normalizeDashes(inputValue);
      let date = this.dateHelpers.date(dateString);
      const formatString = this.props.formatString;

      // Prevent early parsing of value.
      // Eg 25.12.2 will be transformed to 25.12.0002 formatted from date to string
      if (
        dateString.replace(/(\s)*/g, '').length <
        formatString.replace(/(\s)*/g, '').length
      ) {
        date = null;
      } else {
        date = parseDateString(dateString);
      }

      const {displayValueAtRangeIndex, onChange, range, value} = this.props;
      if (date && this.dateHelpers.isValid(date) && onChange) {
        if (
          range &&
          Array.isArray(value) &&
          typeof displayValueAtRangeIndex === 'number'
        ) {
          let [left, right] = value;
          if (displayValueAtRangeIndex === 0) {
            left = date;
            if (!right) {
              onChange({date: [left]});
            } else {
              if (
                this.dateHelpers.isAfter(right, left) ||
                this.dateHelpers.isEqual(left, right)
              ) {
                onChange({date: [left, right]});
              } else {
                // Is resetting back to previous value appropriate? Invalid range is not
                // communicated to the user, but if it was not reset the text value would
                // show one value and date value another. This seems a bit better but clearly
                // has a downside.
                onChange({date: [...value]});
              }
            }
          } else if (displayValueAtRangeIndex === 1) {
            right = date;
            if (!left) {
              // If start value is not defined, set start/end to the same day.
              onChange({date: [right, right]});
            } else {
              if (
                this.dateHelpers.isAfter(right, left) ||
                this.dateHelpers.isEqual(left, right)
              ) {
                onChange({date: [left, right]});
              } else {
                // See comment above about resetting dates on invalid range
                onChange({date: [...value]});
              }
            }
          }
        } else {
          onChange({date});
        }
      }
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
    // replacing both hyphens and em-dashes with en-dashes
    return inputValue.replace(/-/g, '–').replace(/—/g, '–');
  };

  componentDidUpdate(prevProps: DatepickerPropsT<T>) {
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
      this.props.placeholder || this.props.placeholder === ''
        ? this.props.placeholder
        : this.props.range
        ? 'YYYY/MM/DD – YYYY/MM/DD'
        : 'YYYY/MM/DD';

    return (
      <LocaleContext.Consumer>
        {locale => (
          <React.Fragment>
            <PopoverComponent
              focusLock={false}
              mountNode={this.props.mountNode}
              placement={PLACEMENT.bottom}
              isOpen={this.state.isOpen}
              onClickOutside={this.close}
              onEsc={this.handleEsc}
              content={
                <Calendar
                  adapter={this.props.adapter}
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
                    this.props['aria-label'] ||
                    (this.props.range
                      ? locale.datepicker.ariaLabelRange
                      : locale.datepicker.ariaLabel)
                  }
                  error={this.props.error}
                  positive={this.props.positive}
                  aria-describedby={this.props['aria-describedby']}
                  aria-labelledby={this.props['aria-labelledby']}
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
                width: '0px',
                height: '0px',
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                padding: 0,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                clipPath: 'inset(100%)',
              }}
            >
              {locale.datepicker.screenReaderMessageInput}
            </p>
            <p
              aria-live="assertive"
              style={{
                position: 'fixed',
                width: '0px',
                height: '0px',
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                padding: 0,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                clipPath: 'inset(100%)',
              }}
            >
              {// No date selected
              !this.props.value ||
              (Array.isArray(this.props.value) && !this.props.value.length)
                ? ''
                : // Date selected in a non-range picker
                !Array.isArray(this.props.value)
                ? getInterpolatedString(locale.datepicker.selectedDate, {
                    date: this.state.inputValue || '',
                  })
                : // Start and end dates are selected in a range picker
                this.props.value.length > 1
                ? getInterpolatedString(locale.datepicker.selectedDateRange, {
                    startDate: this.formatDisplayValue(this.props.value[0]),
                    endDate: this.formatDisplayValue(
                      // $FlowFixMe
                      this.props.value[1],
                    ),
                  })
                : // A single date selected in a range picker
                  `${getInterpolatedString(locale.datepicker.selectedDate, {
                    date: this.formatDisplayValue(this.props.value[0]),
                  })} ${locale.datepicker.selectSecondDatePrompt}`}
            </p>
          </React.Fragment>
        )}
      </LocaleContext.Consumer>
    );
  }
}
