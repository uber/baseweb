/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useRef} from 'react';

import {Input as DefaultInput} from '../input/index.js';
import {countries, SIZE} from './constants.js';
import CountrySelect from './country-select.js';
import Flag from './flag.js';
import {Select as DefaultSelect} from '../select/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

import type {PropsT} from './types.js';

export default function PhoneInput(props: PropsT) {
  const {
    inputValue,
    countryValue,
    onInputChange,
    onCountryChange,
    size = SIZE.default,
    dropdownHeight = '400px',
    dropdownWidth = '400px',
    mapIsoToLabel = null,
    overrides = {
      Input: {},
      Select: {},
    },
  } = props;
  const inputRef = useRef(null);
  const baseOverrides = {
    Input: {
      style: {
        paddingLeft: '4px',
      },
    },
    Before: {
      component: function Before(props) {
        const baseOverrides = {
          ValueContainer: {
            style: {
              width: {
                [SIZE.compact]: '34px',
                [SIZE.default]: '42px',
                [SIZE.large]: '50px',
              }[size],
            },
          },
          IconsContainer: {
            style: {
              paddingRight: '0',
            },
          },
          SingleValue: {
            style: {
              display: 'flex',
              alignItems: 'center',
            },
          },
          DropdownContainer: {
            style: {
              width: dropdownWidth,
              maxWidth: 'calc(100vw - 10px)',
            },
          },
          Dropdown: {
            component: CountrySelect,
            props: {
              dropdownHeight: dropdownHeight,
              mapIsoToLabel: mapIsoToLabel,
            },
          },
        };
        const [Select, selectProps] = getOverrides(
          overrides.Select,
          DefaultSelect,
        );
        const selectOverrides = mergeOverrides(baseOverrides, props.overrides);
        return (
          <Select
            size={size}
            value={[countryValue]}
            onChange={event => {
              if (inputRef && inputRef.current) {
                inputRef.current.focus();
              }
              onCountryChange(event);
            }}
            options={countries}
            clearable={false}
            searchable={false}
            getValueLabel={({option}) => {
              return option.id ? (
                <Flag iso2={String(option.id)} size={size} />
              ) : null;
            }}
            overrides={selectOverrides}
            {...selectProps}
          />
        );
      },
    },
  };
  const [Input, inputProps] = getOverrides(overrides.Input, DefaultInput);
  const inputOverrides = mergeOverrides(baseOverrides, overrides);
  return (
    <Input
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
