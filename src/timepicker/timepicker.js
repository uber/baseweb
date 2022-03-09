/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import type {OnChangeParamsT, OptionT} from '../select/index.js';
import {filterOptions, Select} from '../select/index.js';
import DateHelpers from '../datepicker/utils/date-helpers.js';
import dateFnsAdapter from '../datepicker/utils/date-fns-adapter.js';
import type {
  TimePickerDefaultPropsT,
  TimePickerPropsT,
  TimePickerStateT,
} from './types.js';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const NOON = DAY / 2;

class TimePicker<T = Date> extends React.Component<
  TimePickerPropsT<T>,
  TimePickerStateT,
> {
  static defaultProps: TimePickerDefaultPropsT = {
    format: '12',
    step: 900,
    creatable: false,
    adapter: dateFnsAdapter,
    ignoreMinMaxDateComponent: false,
  };
  dateHelpers: DateHelpers<T>;

  state = {steps: [], value: null};

  constructor(props: TimePickerPropsT<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
  }

  componentDidMount() {
    const steps = this.buildSteps();

    if (this.props.value && this.props.adapter.isValid(this.props.value)) {
      this.setState({
        steps: steps,
        value: this.buildSelectedOption(this.props.value, this.props.format),
      });
    } else {
      const seconds = this.dateHelpers.dateToSeconds(this.props.adapter.date());
      let closestStep = NOON;
      steps.forEach((step) => {
        if (Math.abs(step - seconds) < Math.abs(closestStep - seconds)) {
          closestStep = step;
        }
      });
      this.setState({
        steps: steps,
        value: this.props.nullable
          ? undefined
          : {
              id: closestStep,
              label: this.secondsToLabel(closestStep, this.props.format),
            },
      });
      if (this.props.value || (!this.props.nullable && !this.props.value)) {
        this.handleChange(closestStep);
      }
    }
  }

  componentDidUpdate(prevProps: TimePickerPropsT<T>) {
    const formatChanged = prevProps.format !== this.props.format;
    const stepChanged = prevProps.step !== this.props.step;
    const adapterChanged = prevProps.adapter !== this.props.adapter;
    const minTimeChange = prevProps.minTime !== this.props.minTime;
    const maxTimeChange = prevProps.maxTime !== this.props.maxTime;
    if (adapterChanged) {
      this.dateHelpers = new DateHelpers(this.props.adapter);
    }
    if (formatChanged || stepChanged || minTimeChange || maxTimeChange) {
      const steps = this.buildSteps();
      this.setState({steps});
    }
    if (prevProps.value && !this.props.value) {
      this.setState({value: null});
    }
  }

  onChange = (params: OnChangeParamsT) => {
    this.setState({value: params.value[0]});
    if (params.value.length === 0) {
      if (this.props.nullable) {
        this.props.onChange && this.props.onChange(null);
      }
      return;
    }
    const seconds: number =
      typeof params.value[0].id === 'string'
        ? parseInt(params.value[0].id, 10)
        : params.value[0].id || 0;
    this.handleChange(seconds);
  };

  secondsToLabel = (seconds: number, format?: '12' | '24') => {
    let [hours, minutes] = this.dateHelpers.secondsToHourMinute(seconds);
    const zeroPrefix = (n) => (n < 10 ? `0${n}` : n);

    if (format === '12') {
      const isAfterNoon = seconds >= NOON;
      if (isAfterNoon) {
        hours -= 12;
      }

      if (hours === 0) {
        hours = 12;
      }

      return `${hours}:${zeroPrefix(minutes)} ${isAfterNoon ? 'PM' : 'AM'}`;
    }

    return `${zeroPrefix(hours)}:${zeroPrefix(minutes)}`;
  };

  /**
   * Converts a time string, e.g. 10:00, to one or more possible TimePicker
   * options representing that time.
   */
  stringToOptions: (string, format?: '12' | '24') => Array<OptionT> = (
    str,
    format = '12',
  ) => {
    // leading zero is optional, AM/PM is optional
    const twelveHourRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]?)?$/;
    // leading zero is optional
    const twentyFourHourRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    const regex = format === '12' ? twelveHourRegex : twentyFourHourRegex;
    const match = str.match(regex);
    if (!match) {
      return [];
    }
    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    let hoursMinutes = [];
    switch (format) {
      case '24': {
        hoursMinutes = [{hours, minutes}];
        break;
      }
      case '12':
      default: {
        const twelveHours = hours % 12;
        const meridiem = match[3];
        // if there's no AM/PM, add both AM and PM options
        if (!meridiem) {
          hoursMinutes = [
            {hours: twelveHours, minutes},
            {hours: twelveHours + 12, minutes},
          ];
        } else {
          const twentyFourHours =
            meridiem.toLowerCase()[0] === 'a' ? twelveHours : twelveHours + 12;

          hoursMinutes = [{hours: twentyFourHours, minutes}];
        }
        break;
      }
    }

    return hoursMinutes.map(({hours, minutes}) => {
      const secs = hours * 3600 + minutes * 60;
      return {id: secs, label: this.secondsToLabel(secs, format)};
    });
  };

  handleChange = (seconds: number) => {
    const [hours, minutes] = this.dateHelpers.secondsToHourMinute(seconds);
    const updatedDate = this.setTime(this.props.value, hours, minutes, 0);
    this.props.onChange && this.props.onChange(updatedDate);
  };

  setTime: (?T, number, number, number) => T = (
    val,
    hours,
    minutes,
    seconds,
  ) => {
    const {setSeconds, setMinutes, setHours} = this.dateHelpers;
    const date = this.props.adapter.startOfDay(
      this.props.adapter.date(val || undefined),
    );
    return setSeconds(setMinutes(setHours(date, hours), minutes), seconds);
  };

  getTimeWindowInSeconds = (step: number): {start: number, end: number} => {
    let {minTime: min, maxTime: max, ignoreMinMaxDateComponent} = this.props;
    const dayStart = this.setTime(this.props.value, 0, 0, 0);
    const dayEnd = this.setTime(this.props.value, 24, 0, 0);

    if (
      !min ||
      (this.props.adapter.isBefore(min, dayStart) && !ignoreMinMaxDateComponent)
    ) {
      min = dayStart;
    } else {
      min = this.setTime(
        this.props.value,
        this.props.adapter.getHours(min),
        this.props.adapter.getMinutes(min),
        this.props.adapter.getSeconds(min),
      );
    }

    if (
      !max ||
      (this.props.adapter.isAfter(max, dayEnd) && !ignoreMinMaxDateComponent)
    ) {
      max = dayEnd;
    } else {
      max = this.setTime(
        this.props.value,
        this.props.adapter.getHours(max),
        this.props.adapter.getMinutes(max),
        // maxTime (if provided) should be inclusive, so add an extra second here
        this.props.adapter.getSeconds(max) + 1,
      );
    }

    const minDate = this.props.adapter.toJsDate(min);
    const maxDate = this.props.adapter.toJsDate(max);
    const midnightDate = this.props.adapter.toJsDate(dayStart);
    return {
      start: (minDate - midnightDate) / 1000,
      end: (maxDate - midnightDate) / 1000,
    };
  };

  buildSteps = () => {
    const {step = 900} = this.props;

    const timeWindow = this.getTimeWindowInSeconds(step);
    let stepCount = (timeWindow.end - timeWindow.start) / step;
    if (__DEV__ && stepCount > 500) {
      // eslint-disable-next-line no-console
      console.warn(
        `Provided step value (${step}) results in ${stepCount} steps. Performance may suffer when more than 500 elements are rendered.`,
      );
    }

    if (!Number.isInteger(stepCount)) {
      const previousStepCount = stepCount;
      stepCount = Math.round(stepCount);

      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn(
          `Provided step value (${step}) does not spread evenly across a day. Rounding from ${previousStepCount} total steps to ${stepCount}.`,
        );
      }
    }

    const options = [];
    for (let i = timeWindow.start; i < timeWindow.end; i += step) {
      options.push(i);
    }
    return options;
  };

  creatableFilterOptions: typeof filterOptions = (
    options,
    filterValue,
    excludeOptions,
    newProps,
  ) => {
    const result = this.stringToOptions(filterValue, this.props.format);
    if (result.length) {
      return result;
    }
    return filterOptions(options, filterValue, excludeOptions, newProps);
  };

  buildSelectedOption: (T, ?'12' | '24') => OptionT = (
    value,
    format = '12',
  ) => {
    const secs = this.dateHelpers.dateToSeconds(value);
    return {
      id: secs,
      label: this.secondsToLabel(secs, format || '12'),
    };
  };

  render() {
    const {format, overrides = {}, adapter} = this.props;

    const [OverriddenSelect, selectProps] = getOverrides(
      overrides.Select,
      Select,
    );
    selectProps.overrides = mergeOverrides(
      {Dropdown: {style: {maxHeight: '126px'}}},
      selectProps.overrides,
    );

    const value =
      this.props.value && adapter.isValid(this.props.value)
        ? this.buildSelectedOption(this.props.value, this.props.format)
        : this.state.value;

    return (
      <LocaleContext.Consumer>
        {(locale) => {
          let ariaLabel;

          if (locale.datepicker.timePickerAriaLabel) {
            ariaLabel = locale.datepicker.timePickerAriaLabel;
          } else {
            ariaLabel =
              format === '12'
                ? locale.datepicker.timePickerAriaLabel12Hour
                : locale.datepicker.timePickerAriaLabel24Hour;
          }

          return (
            <OverriddenSelect
              aria-label={ariaLabel}
              disabled={this.props.disabled}
              error={this.props.error}
              positive={this.props.positive}
              size={this.props.size}
              placeholder={this.props.placeholder || 'HH:mm'}
              options={this.state.steps.map((n) => ({
                id: n,
                label: this.secondsToLabel(n, this.props.format),
              }))}
              filterOptions={
                this.props.creatable ? this.creatableFilterOptions : undefined
              }
              onChange={this.onChange}
              // if value is defined, it should be an array type
              value={value ? [value] : value}
              clearable={false}
              backspaceRemoves={false}
              valueKey="label"
              {...selectProps}
            />
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

export default TimePicker;
