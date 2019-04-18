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

import type {TimePickerProps, TimePickerState} from './types.js';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const NOON = DAY / 2;

function zeroPrefix(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
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

  if (format === '12') {
    const isAfterNoon = seconds >= NOON;
    if (isAfterNoon) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    return `${hours} : ${zeroPrefix(minutes)} ${isAfterNoon ? 'PM' : 'AM'}`;
  }

  return `${zeroPrefix(hours)} : ${zeroPrefix(minutes)}`;
}

class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
  state = {options: [], value: []};

  componentDidMount() {
    const options = this.buildOptions();
    this.setState({options});

    if (isNaN(this.props.value)) {
      const now = new Date();
      const hours = now.getHours() * HOUR;
      const minutes = now.getMinutes() * MINUTE;
      const totalSeconds = hours + minutes;

      let closestStep = NOON;
      options.forEach(option => {
        if (
          Math.abs(Number(option.id) - totalSeconds) <
          Math.abs(Number(closestStep) - totalSeconds)
        ) {
          closestStep = option.id;
        }
      });

      this.setState({value: [{id: closestStep}]});
    } else {
      this.setState({value: [{id: this.props.value}]});
    }
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.format !== this.props.format ||
      prevProps.step !== this.props.step
    ) {
      const options = this.buildOptions();
      this.setState({options});
    }
  }

  buildOptions = () => {
    const {step = 900} = this.props;
    let stepCount = DAY / step;

    if (!Number.isInteger(stepCount)) {
      const previousStepCount = stepCount;
      stepCount = Math.round(stepCount);

      if (__DEV__) {
        console.warn(
          `Provided step value (${step}) does not spread evenly across a day. Rounding from ${previousStepCount} total steps to ${stepCount}.`,
        );
      }
    }

    const options = [];
    for (let i = 0; i < DAY; i += step) {
      options.push({
        id: i,
        label: secondsToLabel(i, this.props.format),
      });
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
      {
        Dropdown: {style: {maxHeight: '126px'}},
      },
      // $FlowFixMe
      selectProps && selectProps.overrides,
    );
    // $FlowFixMe
    selectProps.overrides = selectOverrides;

    return (
      <LocaleContext.Consumer>
        {locale => (
          <Select
            aria-label={locale.datepicker.timePickerAriaLabel}
            options={this.state.options}
            onChange={params => {
              this.setState({value: params.value});
              onChange(Number(params.value[0].id));
            }}
            value={[{id: this.props.value}] || this.state.value}
            clearable={false}
            {...selectProps}
          />
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default TimePicker;
