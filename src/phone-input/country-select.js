/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import Flag from './flag.js';
import {SIZE, countries} from './constants.js';
import CountrySelectDropdown from './country-select-dropdown.js';
import {Select as DefaultSelect} from '../select/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

import type {CountrySelectPropsT} from './types.js';

export default function CountrySelect(props: CountrySelectPropsT) {
  const {
    countryValue,
    inputRef,
    onCountryChange = event => {},
    size = SIZE.default,
    dropdownWidth = '400px',
    dropdownHeight = '400px',
    mapIsoToLabel,
    overrides = {
      CountrySelect: {},
    },
  } = props;
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
      component: CountrySelectDropdown,
      props: {
        dropdownHeight: dropdownHeight,
        mapIsoToLabel: mapIsoToLabel,
      },
    },
  };
  const [Select, selectProps] = getOverrides(
    overrides.CountrySelect,
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
        return option.id ? <Flag iso2={String(option.id)} size={size} /> : null;
      }}
      overrides={selectOverrides}
      {...selectProps}
    />
  );
}
