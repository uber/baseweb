/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import Flag from './flag.js';
import {
  SIZE,
  countries,
  DEFAULT_DROPDOWN_HEIGHT,
  DEFAULT_DROPDOWN_WIDTH,
} from './constants.js';
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
    dropdownWidth = DEFAULT_DROPDOWN_WIDTH,
    dropdownHeight = DEFAULT_DROPDOWN_HEIGHT,
    mapIsoToLabel,
    overrides = {
      CountrySelect: {},
      CountrySelectDropdown: {},
      CountrySelectDropdownListItem: {},
      CountrySelectDropdownFlagColumn: {},
      CountrySelectDropdownNameColumn: {},
      CountrySelectDropdownDialcodeColumn: {},
    },
  } = props;
  const baseOverrides = {
    ControlContainer: {
      style: props => {
        if (!props.$isFocused && !props.$isPseudoFocused) {
          return {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          };
        }
      },
    },
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
        overrides: {
          CountrySelectDropdown: overrides.CountrySelectDropdown,
          CountrySelectDropdownListItem:
            overrides.CountrySelectDropdownListItem,
          CountrySelectDropdownFlagColumn:
            overrides.CountrySelectDropdownFlagColumn,
          CountrySelectDropdownNameColumn:
            overrides.CountrySelectDropdownNameColumn,
          CountrySelectDropdownDialcodeColumn:
            overrides.CountrySelectDropdownDialcodeColumn,
        },
      },
    },
  };
  const [Select, selectProps] = getOverrides(
    overrides.CountrySelect,
    DefaultSelect,
  );
  const selectOverrides = mergeOverrides(baseOverrides, overrides);
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
