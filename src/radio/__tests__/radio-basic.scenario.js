/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {RadioGroup, Radio} from '../index.js';

export default function Example() {
  const [value, setValue] = React.useState('1');

  function handleChange(e) {
    console.log(e);
    setValue(e.target.value);
  }

  return (
    <RadioGroup name="basic usage" onChange={handleChange} value={value}>
      <Radio value="1">First</Radio>
      <Radio value="2">Second</Radio>
      <Radio value="3">Third</Radio>
    </RadioGroup>
  );
}
