/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState, useContext} from 'react';
import MomentAdapter from '@date-io/moment';

import {TimePicker} from '../index.js';
import {SIZE} from '../../input/index.js';

const moment = new MomentAdapter();

const MIDNIGHT = moment.startOfDay(moment.date([2019, 3, 19]));
const OFF_STEP_TIME = moment.date([2019, 3, 19, 1, 11]);
const overrides = {
  Select: {
    props: {overrides: {ValueContainer: {props: {'data-id': 'selected'}}}},
  },
};

const MomentTimePicker: Class<TimePicker<moment$Moment>> = TimePicker;

const Controlled = ({
  size = 'default',
  initialDate,
  creatable = false,
  onChange = () => {},
  ...restProps
}) => {
  const [time, setTime] = useState<?moment$Moment>(initialDate);
  return (
    <React.Fragment>
      <MomentTimePicker
        adapter={moment}
        value={time}
        onChange={time => {
          setTime(time);
          onChange();
        }}
        overrides={overrides}
        creatable={creatable}
        size={size}
        {...restProps}
      />
      <p data-e2e="hours">hour: {time ? moment.getHours(time) : 'null'}</p>
      <p data-e2e="minutes">
        minute: {time ? moment.getMinutes(time) : 'null'}
      </p>
    </React.Fragment>
  );
};

export default function Scenario() {
  const [value, setValue] = React.useState(null);

  return (
    <div style={{width: '130px'}}>
      <div data-e2e="12-hour">
        12 hour format
        <Controlled format="12" step={900} initialDate={null} nullable={true} />
      </div>
      <div data-e2e="24-hour">
        24 hour format
        <Controlled format="24" step={1800} initialDate={MIDNIGHT} />
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
}
