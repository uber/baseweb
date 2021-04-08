/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {RadioGroup, Radio} from '../index.js';

function Standard() {
  const [value, setValue] = React.useState('1');

  function handleChange(e) {
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

function WithoutGroup() {
  const [value, setValue] = React.useState('1');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div role="radiogroup">
      <Radio onChange={handleChange} value="1">
        Regular crust
      </Radio>
      <Radio onChange={handleChange} value="2">
        Deep dish
      </Radio>
      <Radio onChange={handleChange} value="3">
        Thin crust
      </Radio>
    </div>
  );
}

function Custom() {
  const options = ['Cat', 'Dog', 'Fish'];
  const [value, setValue] = React.useState(options[0]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div role="radiogroup">
      {options.map(option => {
        const checked = value === option;
        return (
          <label key={option} style={{display: 'block'}}>
            <input
              style={{height: 0, width: 0, margin: 0, padding: 0}}
              type="radio"
              value={option}
              onChange={handleChange}
              checked={checked}
            />
            <span
              style={{
                backgroundColor: checked ? 'orange' : 'firebrick',
                display: 'inline-block',
                height: '12px',
                width: '12px',
              }}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

export default function Example() {
  return (
    <div>
      <Standard />
      <WithoutGroup />
      <Custom />
    </div>
  );
}
