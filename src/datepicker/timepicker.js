/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import {Select} from '../select/index.js';

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
  const hours = (seconds % DAY) / HOUR;
  const hoursFloor = Math.floor(hours);
  const hoursDelta = hours - hoursFloor;
  const minutes = Math.floor(60 * hoursDelta);
  return [hoursFloor, minutes];
}

function secondsToLabel(seconds, format = '12') {
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

class TimePicker extends React.Component<TimePickerPropsT, TimePickerStateT> {
  state = {steps: [], value: null};

  componentDidMount() {
    const steps = this.buildSteps();
    if (this.props.value instanceof Date) {
      this.setState({
        steps: steps,
        value: dateToSeconds(this.props.value),
      });
    } else {
      const seconds = dateToSeconds(new Date());
      let closestStep = NOON;
      steps.forEach(step => {
        if (Math.abs(step - seconds) < Math.abs(closestStep - seconds)) {
          closestStep = step;
        }
      });
      this.setState({steps: steps, value: closestStep});
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

  render() {
    const {onChange = n => {}, overrides = {}} = this.props;

    const [OverridedSelect, selectProps] = getOverrides(
      overrides.Select,
      Select,
    );
    const selectOverrides = mergeOverrides(
      {Dropdown: {style: {maxHeight: '126px'}}},
      // $FlowFixMe
      selectProps && selectProps.overrides,
    );
    // $FlowFixMe
    selectProps.overrides = selectOverrides;

    const id =
      this.props.value instanceof Date
        ? dateToSeconds(this.props.value)
        : this.state.value;

    return (
      <LocaleContext.Consumer>
        {locale => (
          <OverridedSelect
            aria-label={locale.datepicker.timePickerAriaLabel}
            options={this.state.steps.map(n => ({
              id: n,
              label: secondsToLabel(n, this.props.format),
            }))}
            onChange={params => {
              this.setState({value: params.value});

              const date = this.props.value || new Date();
              const seconds = params.value[0].id;
              const [hours, minutes] = secondsToHourMinute(seconds);
              date.setHours(hours, minutes, 0);
              onChange(date);
            }}
            value={[{id}]}
            clearable={false}
            {...selectProps}
          />
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default TimePicker;
