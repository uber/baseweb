/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import {Select, filterOptions} from '../select/index.js';

import type {OptionT} from '../select/index.js';
import type {TimePickerPropsT, TimePickerStateT} from './types.js';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const NOON = DAY / 2;

function dateToSeconds(date: Date) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes() * MINUTE;
  const hours = date.getHours() * HOUR;
  return seconds + minutes + hours;
}

function secondsToHourMinute(seconds) {
  const d = new Date(seconds * 1000);
  return [d.getUTCHours(), d.getUTCMinutes()];
}

function secondsToLabel(seconds, format) {
  let [hours, minutes] = secondsToHourMinute(seconds);
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

/**
 * Converts a time string, e.g. 10:00, to one or more possible TimePicker
 * options representing that time.
 */
function stringToOptions(
  str: string,
  format: '12' | '24' = '12',
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
    return {id: secs, label: secondsToLabel(secs, format)};
  });
}

class TimePicker extends React.Component<TimePickerPropsT, TimePickerStateT> {
  static defaultProps = {
    format: '12',
    step: 900,
    creatable: false,
  };

  state = {steps: [], value: null};

  componentDidMount() {
    const steps = this.buildSteps();
    if (this.props.value instanceof Date) {
      this.setState({
        steps: steps,
        value: this.buildSelectedOption(this.props.value, this.props.format),
      });
    } else {
      const seconds = dateToSeconds(new Date());
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
          : {id: closestStep, label: secondsToLabel(closestStep)},
      });
      this.handleChange(closestStep);
    }
  }

  componentDidUpdate(prevProps: TimePickerPropsT) {
    const formatChanged = prevProps.format !== this.props.format;
    const stepChanged = prevProps.step !== this.props.step;
    if (formatChanged || stepChanged) {
      const steps = this.buildSteps();
      this.setState({steps});
    }
  }

  handleChange = (seconds: number) => {
    if (!this.props.value) {
      return;
    }
    const date = new Date(this.props.value);
    const [hours, minutes] = secondsToHourMinute(seconds);
    date.setHours(hours, minutes, 0);
    this.props.onChange && this.props.onChange(date);
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
    const result = stringToOptions(filterValue, this.props.format);
    if (result.length) {
      return result;
    }
    return filterOptions(options, filterValue, excludeOptions, newProps);
  };

  buildSelectedOption(value: Date, format: '12' | '24' = '12') {
    const secs = dateToSeconds(value);
    return {
      id: secs,
      label: secondsToLabel(secs, format),
    };
  }

  render() {
    const {overrides = {}} = this.props;

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
      this.props.value instanceof Date
        ? this.buildSelectedOption(this.props.value, this.props.format)
        : this.state.value;

    return (
      <LocaleContext.Consumer>
        {locale => (
          <OverriddenSelect
            aria-label={locale.datepicker.timePickerAriaLabel}
            disabled={this.props.disabled}
            error={this.props.error}
            positive={this.props.positive}
            size={this.props.size}
            placeholder={this.props.placeholder || 'HH:mm'}
            options={this.state.steps.map(n => ({
              id: n,
              label: secondsToLabel(n, this.props.format),
            }))}
            filterOptions={
              this.props.creatable ? this.creatableFilterOptions : undefined
            }
            onChange={params => {
              this.setState({value: params.value[0]});

              const date = this.props.value || new Date();
              const seconds = params.value[0].id;
              const [hours, minutes] = secondsToHourMinute(seconds);
              date.setHours(hours, minutes, 0);
              this.handleChange(params.value[0].id);
            }}
            value={value}
            clearable={false}
            {...selectProps}
          />
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default TimePicker;
