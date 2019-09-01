/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { MaskedInput } from '../input/index';
import { Popover, PLACEMENT } from '../popover/index';
import Calendar from './calendar';
import { getOverrides } from '../helpers/overrides';
import getInterpolatedString from '../helpers/i18n-interpolation';
import { LocaleContext } from '../locale/index';
import {
  StyledInputWrapper,
  StyledInputLabel,
  StyledStartDate,
  StyledEndDate,
} from './styled-components';
import type { DatepickerPropsT, InputRoleT } from './types';
import DateHelpers from './utils/date-helpers';
import dateFnsAdapter from './utils/date-fns-adapter';
import type { LocaleT } from '../locale/types';
import { INPUT_ROLE, RANGED_CALENDAR_BEHAVIOR } from './constants';

import type { ChangeEvent } from 'react';

export const DEFAULT_DATE_FORMAT = 'yyyy/MM/dd';

const INPUT_DELIMITER = '–';

const combineSeparatedInputs = (newInputValue, prevCombinedInputValue = '', inputRole) => {
  let inputValue = newInputValue;
  const [prevStartDate = '', prevEndDate = ''] = prevCombinedInputValue.split(
    ` ${INPUT_DELIMITER} `
  );
  if (inputRole === INPUT_ROLE.startDate && prevEndDate) {
    inputValue = `${inputValue} ${INPUT_DELIMITER} ${prevEndDate}`;
  }
  if (inputRole === INPUT_ROLE.endDate) {
    inputValue = `${prevStartDate} ${INPUT_DELIMITER} ${inputValue}`;
  }
  return inputValue;
};

type StateT = {
  calendarFocused: boolean;
  isOpen: boolean;
  selectedInput: InputRoleT | undefined | null;
  isPseudoFocused: boolean;
  lastActiveElm: HTMLElement | undefined | null;
  inputValue?: string;
};

export default class Datepicker<T = Date> extends React.Component<DatepickerPropsT<T>, StateT> {
  static defaultProps = {
    'aria-describedby': 'datepicker--screenreader--message--input',
    value: null,
    formatString: DEFAULT_DATE_FORMAT,
    adapter: dateFnsAdapter,
  };

  calendar: HTMLElement | undefined | null;

  dateHelpers: DateHelpers<T>;

  constructor(props: DatepickerPropsT<T>) {
    super(props);
    //$FlowFixMe[incompatible-call]
    this.dateHelpers = new DateHelpers(props.adapter);
    this.state = {
      calendarFocused: false,
      isOpen: false,
      selectedInput: null,
      isPseudoFocused: false,
      lastActiveElm: null,
      inputValue: this.formatDisplayValue(props.value) || '',
    };
  }

  handleChange: (a: T | undefined | null | Array<T | undefined | null>) => void = (date) => {
    const onChange = this.props.onChange;
    const onRangeChange = this.props.onRangeChange;

    if (Array.isArray(date)) {
      if (onChange && date.every(Boolean)) {
        // flowlint-next-line unclear-type:off
        onChange({ date: date as any as Array<T> });
      }

      if (onRangeChange) {
        onRangeChange({ date: [...date] });
      }
    } else {
      if (onChange) {
        onChange({ date });
      }

      if (onRangeChange) {
        onRangeChange({ date });
      }
    }
  };

  onCalendarSelect: (a: {
    readonly date: T | undefined | null | Array<T | undefined | null>;
  }) => void = (data) => {
    let isOpen = false;
    let isPseudoFocused = false;
    let calendarFocused = false;
    let nextDate = data.date;

    if (Array.isArray(nextDate) && this.props.range) {
      if (!nextDate[0] || !nextDate[1]) {
        isOpen = true;
        isPseudoFocused = true;
        calendarFocused = null;
      } else if (nextDate[0] && nextDate[1]) {
        const [start, end] = nextDate;
        if (this.dateHelpers.isAfter(start, end)) {
          if (this.hasLockedBehavior()) {
            nextDate = this.props.value;
            isOpen = true;
          } else {
            nextDate = [start, start];
          }
        } else if (
          this.dateHelpers.dateRangeIncludesDates(
            // $FlowFixMe Cannot call `this.dateHelpers.dateRangeIncludesDates` with `nextDate` bound to the first parameter because  read-only array type [1] is incompatible with  array type [2]
            nextDate,
            this.props.excludeDates
          )
        ) {
          nextDate = this.props.value;
          isOpen = true;
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
    const onlyTimeChanged = (prev?: T | null, next?: T | null) => {
      if (!prev || !next) return false;
      const p = this.dateHelpers.format(prev, 'keyboardDate');
      const n = this.dateHelpers.format(next, 'keyboardDate');
      if (p === n) {
        return (
          this.dateHelpers.getHours(prev) !== this.dateHelpers.getHours(next) ||
          this.dateHelpers.getMinutes(prev) !== this.dateHelpers.getMinutes(next)
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
      ...(calendarFocused === null ? {} : { calendarFocused }),
      inputValue: this.formatDisplayValue(nextDate),
    } as StateT);

    this.handleChange(nextDate);
  };

  getNullDatePlaceholder(formatString: string) {
    return (this.getMask() || formatString).split(INPUT_DELIMITER)[0].replace(/[0-9]|[a-z]/g, ' ');
  }

  formatDate(date: T | undefined | null | Array<T | undefined | null>, formatString: string) {
    const format = (date: T) => {
      if (formatString === DEFAULT_DATE_FORMAT) {
        return this.dateHelpers.format(date, 'slashDate', this.props.locale);
      }
      return this.dateHelpers.formatDate(date, formatString, this.props.locale);
    };

    if (!date) {
      return '';
    } else if (Array.isArray(date) && !date[0] && !date[1]) {
      return '';
    } else if (Array.isArray(date) && !date[0] && date[1]) {
      const endDate = format(date[1]);
      const startDate = this.getNullDatePlaceholder(formatString);
      return [startDate, endDate].join(` ${INPUT_DELIMITER} `);
    } else if (Array.isArray(date)) {
      return date.map((day) => (day ? format(day) : '')).join(` ${INPUT_DELIMITER} `);
    } else {
      return format(date);
    }
  }

  formatDisplayValue: (a: T | undefined | null | Array<T | undefined | null>) => string = (
    date
  ) => {
    const { displayValueAtRangeIndex, formatDisplayValue, range } = this.props;
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

  open = (inputRole?: InputRoleT) => {
    this.setState(
      {
        isOpen: true,
        isPseudoFocused: true,
        calendarFocused: false,
        selectedInput: inputRole,
      },
      this.props.onOpen
    );
  };

  close = () => {
    const isPseudoFocused = false;
    this.setState(
      {
        isOpen: false,
        selectedInput: null,
        isPseudoFocused,
        calendarFocused: false,
      },
      this.props.onClose
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
    const { formatString, mask, range, separateRangeInputs } = this.props;

    if (mask === null || (mask === undefined && formatString !== DEFAULT_DATE_FORMAT)) {
      return null;
    }

    if (mask) {
      return this.normalizeDashes(mask);
    }

    if (range && !separateRangeInputs) {
      return `9999/99/99 ${INPUT_DELIMITER} 9999/99/99`;
    }

    return '9999/99/99';
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>, inputRole?: InputRoleT) => {
    const inputValue =
      this.props.range && this.props.separateRangeInputs
        ? combineSeparatedInputs(event.currentTarget.value, this.state.inputValue, inputRole)
        : event.currentTarget.value;

    const mask = this.getMask();
    const formatString = this.normalizeDashes(this.props.formatString);

    if (
      (typeof mask === 'string' && inputValue === mask.replace(/9/g, ' ')) ||
      inputValue.length === 0
    ) {
      if (this.props.range) {
        this.handleChange([]);
      } else {
        this.handleChange(null);
      }
    }

    this.setState({ inputValue });

    const parseDateString = (dateString) => {
      if (formatString === DEFAULT_DATE_FORMAT) {
        return this.dateHelpers.parse(dateString, 'slashDate', this.props.locale);
      }
      return this.dateHelpers.parseString(dateString, formatString, this.props.locale);
    };

    if (this.props.range && typeof this.props.displayValueAtRangeIndex !== 'number') {
      const [left, right] = this.normalizeDashes(inputValue).split(` ${INPUT_DELIMITER} `);

      let startDate = this.dateHelpers.date(left);
      let endDate = this.dateHelpers.date(right);

      if (formatString) {
        startDate = parseDateString(left);
        endDate = parseDateString(right);
      }

      const datesValid = this.dateHelpers.isValid(startDate) && this.dateHelpers.isValid(endDate);

      // added equal case so that times within the same day can be expressed
      const rangeValid =
        this.dateHelpers.isAfter(endDate, startDate) ||
        this.dateHelpers.isEqual(startDate, endDate);

      if (datesValid && rangeValid) {
        this.handleChange([startDate, endDate]);
      }
    } else {
      const dateString = this.normalizeDashes(inputValue);
      let date = this.dateHelpers.date(dateString);
      const formatString = this.props.formatString;

      // Prevent early parsing of value.
      // Eg 25.12.2 will be transformed to 25.12.0002 formatted from date to string
      if (dateString.replace(/(\s)*/g, '').length < formatString.replace(/(\s)*/g, '').length) {
        date = null;
      } else {
        date = parseDateString(dateString);
      }

      const { displayValueAtRangeIndex, range, value } = this.props;
      if (date && this.dateHelpers.isValid(date)) {
        if (range && Array.isArray(value) && typeof displayValueAtRangeIndex === 'number') {
          let [left, right] = value;
          if (displayValueAtRangeIndex === 0) {
            left = date;
            if (!right) {
              this.handleChange([left]);
            } else {
              if (this.dateHelpers.isAfter(right, left) || this.dateHelpers.isEqual(left, right)) {
                this.handleChange([left, right]);
              } else {
                // Is resetting back to previous value appropriate? Invalid range is not
                // communicated to the user, but if it was not reset the text value would
                // show one value and date value another. This seems a bit better but clearly
                // has a downside.
                this.handleChange([...value]);
              }
            }
          } else if (displayValueAtRangeIndex === 1) {
            right = date;
            if (!left) {
              // If start value is not defined, set start/end to the same day.
              this.handleChange([right, right]);
            } else {
              if (this.dateHelpers.isAfter(right, left) || this.dateHelpers.isEqual(left, right)) {
                this.handleChange([left, right]);
              } else {
                // See comment above about resetting dates on invalid range
                this.handleChange([...value]);
              }
            }
          }
        } else {
          this.handleChange(date);
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
      } as StateT);
    }
  };

  normalizeDashes = (inputValue: string) => {
    // replacing both hyphens and em-dashes with en-dashes
    return inputValue.replace(/-/g, INPUT_DELIMITER).replace(/—/g, INPUT_DELIMITER);
  };

  hasLockedBehavior = () => {
    return (
      this.props.rangedCalendarBehavior === RANGED_CALENDAR_BEHAVIOR.locked &&
      this.props.range &&
      this.props.separateRangeInputs
    );
  };

  componentDidUpdate(prevProps: DatepickerPropsT<T>) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        inputValue: this.formatDisplayValue(this.props.value),
      });
    }
  }

  renderInputComponent(locale: LocaleT, inputRole?: InputRoleT) {
    const { overrides = {} } = this.props;

    const [InputComponent, inputProps] = getOverrides(overrides.Input, MaskedInput);

    const placeholder =
      this.props.placeholder || this.props.placeholder === ''
        ? this.props.placeholder
        : this.props.range && !this.props.separateRangeInputs
        ? `YYYY/MM/DD ${INPUT_DELIMITER} YYYY/MM/DD`
        : 'YYYY/MM/DD';

    const [startDate = '', endDate = ''] = (this.state.inputValue || '').split(
      ` ${INPUT_DELIMITER} `
    );

    const value =
      inputRole === INPUT_ROLE.startDate
        ? startDate
        : inputRole === INPUT_ROLE.endDate
        ? endDate
        : this.state.inputValue;

    return (
      <InputComponent
        aria-disabled={this.props.disabled}
        aria-label={
          this.props['aria-label'] ||
          (this.props.range ? locale.datepicker.ariaLabelRange : locale.datepicker.ariaLabel)
        }
        error={this.props.error}
        positive={this.props.positive}
        aria-describedby={this.props['aria-describedby']}
        aria-labelledby={this.props['aria-labelledby']}
        aria-required={this.props.required || null}
        disabled={this.props.disabled}
        size={this.props.size}
        value={value}
        onFocus={() => this.open(inputRole)}
        onBlur={this.handleInputBlur}
        onKeyDown={this.handleKeyDown}
        onChange={(event) => this.handleInputChange(event, inputRole)}
        placeholder={placeholder}
        mask={this.getMask()}
        required={this.props.required}
        clearable={this.props.clearable}
        {...inputProps}
      />
    );
  }

  render() {
    const { overrides = {}, startDateLabel = 'Start Date', endDateLabel = 'End Date' } = this.props;
    const [PopoverComponent, popoverProps] = getOverrides(overrides.Popover, Popover);
    const [InputWrapper, inputWrapperProps] = getOverrides(
      overrides.InputWrapper,
      StyledInputWrapper
    );
    const [StartDate, startDateProps] = getOverrides(overrides.StartDate, StyledStartDate);
    const [EndDate, endDateProps] = getOverrides(overrides.EndDate, StyledEndDate);
    const [InputLabel, inputLabelProps] = getOverrides(overrides.InputLabel, StyledInputLabel);

    return (
      <LocaleContext.Consumer>
        {(locale) => (
          <React.Fragment>
            <PopoverComponent
              focusLock={false}
              autoFocus={false}
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
                  onChange={this.onCalendarSelect}
                  selectedInput={this.state.selectedInput}
                  hasLockedBehavior={this.hasLockedBehavior()}
                />
              }
              {...popoverProps}
            >
              {}
              <InputWrapper
                {...inputWrapperProps}
                $separateRangeInputs={this.props.range && this.props.separateRangeInputs}
              >
                {this.props.range && this.props.separateRangeInputs ? (
                  <>
                    <StartDate {...startDateProps}>
                      <InputLabel {...inputLabelProps}>{startDateLabel}</InputLabel>
                      {this.renderInputComponent(locale, INPUT_ROLE.startDate)}
                    </StartDate>
                    <EndDate {...endDateProps}>
                      <InputLabel {...inputLabelProps}>{endDateLabel}</InputLabel>
                      {this.renderInputComponent(locale, INPUT_ROLE.endDate)}
                    </EndDate>
                  </>
                ) : (
                  <>{this.renderInputComponent(locale)}</>
                )}
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
              {
                // No date selected
                !this.props.value ||
                (Array.isArray(this.props.value) && !this.props.value[0] && !this.props.value[1])
                  ? ''
                  : // Date selected in a non-range picker
                  !Array.isArray(this.props.value)
                  ? getInterpolatedString(locale.datepicker.selectedDate, {
                      date: this.state.inputValue || '',
                    })
                  : // Start and end dates are selected in a range picker
                  this.props.value[0] && this.props.value[1]
                  ? getInterpolatedString(locale.datepicker.selectedDateRange, {
                      startDate: this.formatDisplayValue(this.props.value[0]),
                      endDate: this.formatDisplayValue(
                        // $FlowFixMe
                        this.props.value[1]
                      ),
                    })
                  : // A single date selected in a range picker
                    `${getInterpolatedString(locale.datepicker.selectedDate, {
                      date: this.formatDisplayValue(this.props.value[0]),
                    })} ${locale.datepicker.selectSecondDatePrompt}`
              }
            </p>
          </React.Fragment>
        )}
      </LocaleContext.Consumer>
    );
  }
}
