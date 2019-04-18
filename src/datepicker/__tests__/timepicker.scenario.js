/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';

import {TimePicker} from '../index.js';

export const name = 'timepicker';

const Controlled = ({initialTime, format}) => {
  const [time, setTime] = useState(initialTime);
  return <TimePicker format={format} value={time} onChange={setTime} />;
};

export const component = () => {
  return (
    <div style={{width: '120px'}}>
      12 hour format
      <Controlled initialTime={0} format="12" />
      24 hour format
      <Controlled initialTime={0} format="24" />
    </div>
  );
};
