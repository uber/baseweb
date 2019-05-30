/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useRef} from 'react';

import {Input as DefaultInput} from '../input/index.js';
import {SIZE} from './constants.js';
import CountrySelect from './country-select.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

import type {PropsT} from './types.js';

export default function PhoneInput(props: PropsT) {
  const {
    inputValue,
    onInputChange,
    size = SIZE.default,
    overrides = {},
  } = props;
  const inputRef = useRef(null);
  const baseOverrides = {
    Input: {
      style: {
        paddingLeft: '4px',
      },
    },
    Before: {
      component: CountrySelect,
      props: {
        ...props,
        inputRef,
      },
    },
  };
  const [Input, inputProps] = getOverrides(overrides.Input, DefaultInput);
  const inputOverrides = mergeOverrides(baseOverrides, overrides);
  return (
    <Input
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      data-baseweb="phone-input"
      size={size}
      inputRef={inputRef}
      value={inputValue}
      onChange={onInputChange}
      overrides={inputOverrides}
      {...inputProps}
    />
  );
}
