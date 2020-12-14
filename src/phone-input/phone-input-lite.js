/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {useRef} from 'react';
import {Input as DefaultInput} from '../input/index.js';
import CountrySelect from './country-select.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import defaultProps from './default-props.js';
import type {LitePropsT} from './types.js';

const {country, ...lightDefaultProps} = defaultProps;

PhoneInputLite.defaultProps = lightDefaultProps;

export default function PhoneInputLite(props: LitePropsT) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    countries,
    country,
    disabled,
    error,
    id,
    mapIsoToLabel,
    maxDropdownHeight,
    maxDropdownWidth,
    name,
    onTextChange,
    onCountryChange,
    overrides,
    placeholder,
    positive,
    required,
    size,
    text,
    ...restProps
  } = props;
  const inputRef = useRef(null);
  const baseOverrides = {
    Input: {
      style: ({$theme: {sizing}}) => ({paddingLeft: sizing.scale100}),
    },
    Before: {
      component: CountrySelect,
      props: {
        countries,
        country,
        disabled,
        error,
        inputRef,
        mapIsoToLabel,
        maxDropdownHeight,
        maxDropdownWidth,
        onCountryChange,
        overrides,
        positive,
        required,
        size,
      },
    },
  };
  const [Input, inputProps] = getOverrides(overrides.Input, DefaultInput);
  // $FlowFixMe
  inputProps.overrides = mergeOverrides(baseOverrides, inputProps.overrides);
  return (
    <Input
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      autoComplete="tel-national"
      data-baseweb="phone-input"
      disabled={disabled}
      error={error}
      id={id}
      inputMode="tel"
      inputRef={inputRef}
      name={name}
      onChange={onTextChange}
      positive={positive}
      placeholder={placeholder}
      size={size}
      type="text"
      value={text}
      {...restProps}
      {...inputProps}
    />
  );
}
