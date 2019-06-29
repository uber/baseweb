/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {useRef} from 'react';
import {Input as DefaultInput} from '../input/index.js';
import CountrySelect from './country-select.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import defaultProps from './default-props.js';
import type {PropsT} from './types.js';

PhoneInput.defaultProps = defaultProps;

export default function PhoneInput(props: PropsT) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    country,
    disabled,
    error,
    onTextChange,
    onCountryChange,
    overrides,
    positive,
    size,
    text,
  } = props;
  const inputRef = useRef(null);
  const baseOverrides = {
    Input: {
      style: ({$theme: {sizing}}) => ({paddingLeft: sizing.scale100}),
    },
    Before: {
      component: CountrySelect,
      props: {
        country,
        inputRef,
        onCountryChange,
        size,
      },
    },
  };
  const [Input, inputProps] = getOverrides(overrides.Input, DefaultInput);
  const inputOverrides = mergeOverrides(baseOverrides, overrides);
  return (
    <Input
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      autoComplete="tel"
      data-baseweb="phone-input"
      disabled={disabled}
      error={error}
      inputRef={inputRef}
      type="tel"
      onChange={onTextChange}
      overrides={inputOverrides}
      positive={positive}
      size={size}
      value={text}
      {...inputProps}
    />
  );
}
