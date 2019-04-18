/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';

import {TimePicker} from '../index.js';

export const name = 'time-picker';

const overrides = {
  Select: {
    props: {overrides: {ValueContainer: {props: {'data-id': 'selected'}}}},
  },
};

const Controlled = ({initialTime, format, step}) => {
  const [time, setTime] = useState(initialTime);
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
        <Controlled initialTime={0} format="12" step={900} />
      </div>
      <div data-e2e="24-hour">
        24 hour format
        <Controlled initialTime={0} format="24" step={1800} />
      </div>
    </div>
  );
};
