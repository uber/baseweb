/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';
// eslint-disable-next-line import/extensions
import startOfDay from 'date-fns/startOfDay';

import {TimePicker} from '../index.js';
import {SIZE} from '../../input/index.js';

export const name = 'time-picker';

const MIDNIGHT = startOfDay(new Date(2019, 3, 19));
const OFF_STEP_TIME = new Date(2019, 3, 19, 1, 11);
const overrides = {
  Select: {
    props: {overrides: {ValueContainer: {props: {'data-id': 'selected'}}}},
  },
};

const Controlled = ({
  format,
  step,
  size = 'default',
  initialDate,
  creatable = false,
}) => {
  const [time, setTime] = useState(initialDate);
  return (
    <React.Fragment>
      <TimePicker
        format={format}
        step={step}
        value={time}
        onChange={setTime}
        overrides={overrides}
        creatable={creatable}
        size={size}
      />
      <p data-e2e="hours">hour: {time.getHours()}</p>
      <p data-e2e="minutes">minute: {time.getMinutes()}</p>
    </React.Fragment>
  );
};

export const component = () => {
  const [value, setValue] = React.useState(null);
  return (
    <div style={{width: '130px'}}>
      <div data-e2e="12-hour">
        12 hour format
        <Controlled
          format="12"
          step={900}
          initialDate={MIDNIGHT}
          creatable={false}
        />
      </div>
      <div data-e2e="24-hour">
        24 hour format
        <Controlled
          format="24"
          step={1800}
          initialDate={MIDNIGHT}
          creatable={false}
        />
      </div>
      <div data-e2e="12-hour-creatable">
        12 hour format creatable
        <Controlled
          format="12"
          step={900}
          initialDate={OFF_STEP_TIME}
          creatable
          size={SIZE.compact}
        />
      </div>
      <div data-e2e="24-hour-creatable">
        24 hour format creatable
        <Controlled
          format="24"
          step={900}
          initialDate={OFF_STEP_TIME}
          creatable
          size={SIZE.large}
        />
      </div>
      <div data-e2e="12-hour">
        Without a value
        <TimePicker
          value={value}
          onChange={date => setValue(date)}
          nullable
          placeholder="XX:YY"
        />
      </div>
    </div>
  );
};
