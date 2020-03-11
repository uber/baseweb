/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import DateFnsAdapter from '@date-io/date-fns';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import {Select, filterOptions} from '../select/index.js';
import type {DateIOAdapter} from '../datepicker/utils/types.js';

import type {OptionT, OnChangeParamsT} from '../select/index.js';
import type {TimePickerPropsT, TimePickerStateT} from './types.js';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const NOON = DAY / 2;

function dateToSeconds<DateT>(date: DateT, adapter: DateIOAdapter<DateT>) {
  const seconds = adapter.getSeconds(date);
  const minutes = adapter.getMinutes(date) * MINUTE;
  const hours = adapter.getHours(date) * HOUR;
  return seconds + minutes + hours;
}

function secondsToHourMinute<DateT>(
  seconds: number,
  adapter: DateIOAdapter<DateT>,
) {
  const d = adapter.toJsDate(adapter.date(seconds * 1000));
  return [d.getUTCHours(), d.getUTCMinutes()];
}

function secondsToLabel<DateT>(
  seconds: number,
  format,
  adapter: DateIOAdapter<DateT>,
) {
  let [hours, minutes] = secondsToHourMinute<DateT>(seconds, adapter);
  const zeroPrefix = n => (n < 10 ? `0${n}` : n);

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
}

function valueToOption<DateT>(
  value: DateT,
  format: '12' | '24' = '12',
  adapter: DateIOAdapter<DateT>,
) {
  const secs = dateToSeconds<DateT>(value, adapter);
  return {
    id: secs,
    label: secondsToLabel<DateT>(secs, format, adapter),
  };
}

/**
 * Converts a time string, e.g. 10:00, to one or more possible TimePicker
 * options representing that time.
 */
function stringToOptions<DateT>(
  str: string,
  format: '12' | '24' = '12',
  adapter: DateIOAdapter<DateT>,
): Array<OptionT> {
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
    return {id: secs, label: secondsToLabel<DateT>(secs, format, adapter)};
  });
}

class TimePicker<DateT = Date> extends React.Component<
  TimePickerPropsT<DateT>,
  TimePickerStateT,
> {
  static defaultProps = {
    format: '12',
    step: 900,
    creatable: false,
  };

  state = {steps: [], value: null};

  componentDidMount() {
    const adapter = this.props.adapter || new DateFnsAdapter();
    const steps = this.buildSteps();

    const value = this.props.value;
    if (value !== undefined && value !== null && adapter.isValid(value)) {
      this.setState({
        steps: steps,
        value: valueToOption(value, this.props.format, adapter),
      });
    } else {
      const now: DateT = (adapter.date(): any);
      const seconds = dateToSeconds<DateT>(now, adapter);
      let closestStep = NOON;
      steps.forEach(step => {
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
              label: secondsToLabel<DateT>(closestStep, undefined, adapter),
            },
      });
      if (this.props.value || (!this.props.nullable && !this.props.value)) {
        this.handleChange(closestStep);
      }
    }
  }

  componentDidUpdate(prevProps: TimePickerPropsT<DateT>) {
    const formatChanged = prevProps.format !== this.props.format;
    const stepChanged = prevProps.step !== this.props.step;
    if (formatChanged || stepChanged) {
      const steps = this.buildSteps();
      this.setState({steps});
    }
  }

  onChange = (params: OnChangeParamsT) => {
    this.setState({value: params.value[0]});
    const seconds: number =
      typeof params.value[0].id === 'string'
        ? parseInt(params.value[0].id, 10)
        : params.value[0].id || 0;
    this.handleChange(seconds);
  };

  handleChange = (seconds: number) => {
    const adapter = this.props.adapter || new DateFnsAdapter();
    const date: DateT = adapter.date(this.props.value) || (adapter.date(): any);
    const [hours, minutes] = secondsToHourMinute<DateT>(seconds, adapter);
    const hourDate = adapter.setHours(date, hours);
    const minuteDate = adapter.setMinutes(hourDate, minutes);
    const updatedDate = adapter.setSeconds(minuteDate, 0);
    this.props.onChange && this.props.onChange(updatedDate);
  };

  buildSteps = () => {
    const {step = 900} = this.props;

    let stepCount = DAY / step;
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
    for (let i = 0; i < DAY; i += step) {
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
    const adapter = this.props.adapter || new DateFnsAdapter();
    const result = stringToOptions(filterValue, this.props.format, adapter);
    if (result.length) {
      return result;
    }
    return filterOptions(options, filterValue, excludeOptions, newProps);
  };

  render() {
    const {format, overrides = {}} = this.props;
    const adapter = this.props.adapter || new DateFnsAdapter();

    const [OverriddenSelect, selectProps] = getOverrides(
      overrides.Select,
      Select,
    );
    const selectOverrides = mergeOverrides(
      {Dropdown: {style: {maxHeight: '126px'}}},
      // $FlowFixMe
      selectProps.overrides,
    );
    // $FlowFixMe
    selectProps.overrides = selectOverrides;

    const value =
      adapter.isValid(this.props.value) && this.props.value
        ? valueToOption(this.props.value, this.props.format, adapter)
        : this.state.value;

    return (
      <LocaleContext.Consumer>
        {locale => {
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
              options={this.state.steps.map(n => ({
                id: n,
                label: secondsToLabel<DateT>(n, this.props.format, adapter),
              }))}
              filterOptions={
                this.props.creatable ? this.creatableFilterOptions : undefined
              }
              onChange={this.onChange}
              // if value is defined, it should be an array type
              value={value ? [value] : value}
              clearable={false}
              {...selectProps}
            />
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

export default TimePicker;
