/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {useRef} from 'react';
import {COUNTRIES} from './constants.js';
import CountryPicker from './country-picker.js';
import defaultProps from './default-props.js';
import {StyledPhoneInputRoot, StyledDialCode} from './styled-components.js';
import {Input as DefaultInput} from '../input/index.js';
import {
  getOverrides,
  mergeOverrides,
  withOverrides,
} from '../helpers/overrides.js';
import type {LitePropsT} from './types.js';

PhoneInputNext.defaultProps = {
  ...defaultProps,
  countries: COUNTRIES,
  clearable: true,
};

function PhoneInputNext(props: LitePropsT) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    clearable,
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

  const baseDialCodeOverride = {
    component: StyledDialCode,
    style: ({$theme: {direction, sizing}}) => {
      const marginDir = direction === 'rtl' ? 'marginRight' : 'marginLeft';
      return {
        [marginDir]: sizing.scale600,
      };
    },
    props: {children: country.dialCode},
  };
  const mergedDialCodeOverride = mergeOverrides(
    {DialCode: baseDialCodeOverride},
    {DialCode: overrides.DialCode || {}},
  );

  const baseOverrides = {
    Input: {
      style: ({$theme: {direction, sizing}}) => {
        const paddingDir = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
        return {
          [paddingDir]: sizing.scale100,
        };
      },
    },
    Before: mergedDialCodeOverride.DialCode,
  };
  const [Root, rootProps] = getOverrides(overrides.Root, StyledPhoneInputRoot);
  const [Input, inputProps] = getOverrides(overrides.Input, DefaultInput);
  // $FlowFixMe
  inputProps.overrides = mergeOverrides(baseOverrides, inputProps.overrides);
  return (
    <Root {...rootProps} data-baseweb="phone-input-next">
      <CountryPicker
        country={country}
        countries={countries}
        disabled={disabled}
        error={error}
        mapIsoToLabel={mapIsoToLabel}
        maxDropdownHeight={maxDropdownHeight}
        maxDropdownWidth={maxDropdownWidth}
        onCountryChange={onCountryChange}
        overrides={overrides}
        positive={positive}
        required={required}
        size={size}
      />
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
        clearable={clearable}
        {...restProps}
        {...inputProps}
      />
    </Root>
  );
}

export default withOverrides(PhoneInputNext, 'PhoneInputNext');
