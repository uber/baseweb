/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';
// eslint-disable-next-line import/extensions
import startOfDay from 'date-fns/startOfDay';

import {TimePicker} from '../index.js';

export const name = 'time-picker';

const MIDNIGHT = startOfDay(new Date(2019, 3, 19));
const overrides = {
  Select: {
    props: {overrides: {ValueContainer: {props: {'data-id': 'selected'}}}},
  },
};

const Controlled = ({format, step}) => {
  const [time, setTime] = useState(MIDNIGHT);
  return (
    <TimePicker
      format={format}
      step={step}
      value={time}
      onChange={setTime}
      overrides={overrides}
    />
  );
};

export const component = () => {
  return (
    <div style={{width: '120px'}}>
      <div data-e2e="12-hour">
        12 hour format
        <Controlled format="12" step={900} />
      </div>
      <div data-e2e="24-hour">
        24 hour format
        <Controlled format="24" step={1800} />
      </div>
    </div>
  );
};
