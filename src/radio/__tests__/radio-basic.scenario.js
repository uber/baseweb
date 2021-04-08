/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {RadioGroup, Radio} from '../index.js';

function Standard() {
  const options = ['First', 'Second', 'Third'];
  const [value, setValue] = React.useState(options[0]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <RadioGroup name="basic usage" onChange={handleChange} value={value}>
      {options.map(option => {
        return (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        );
      })}
    </RadioGroup>
  );
}

function WithoutGroup() {
  const options = ['Regular crust', 'Deep dish', 'Thin crust'];
  const [value, setValue] = React.useState(options[0]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div role="radiogroup">
      {options.map(option => {
        return (
          <Radio
            key={option}
            name="pizza"
            onChange={handleChange}
            value={option}
            checked={value === option}
          >
            {option}
          </Radio>
        );
      })}
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
              name="pets"
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
