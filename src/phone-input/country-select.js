/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StyledRoot, StyledFlag, StyledDialCode} from './styled-components.js';
import {COUNTRIES} from './constants.js';
import CountrySelectDropdown from './country-select-dropdown.js';
import {Block} from '../block/index.js';
import {Select as DefaultSelect} from '../select/index.js';
import {PLACEMENT} from '../popover/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import defaultProps from './default-props.js';

import type {CountryT, CountrySelectPropsT} from './types.js';

CountrySelect.defaultProps = {
  disabled: defaultProps.disabled,
  inputRef: null,
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  maxDropdownWidth: defaultProps.maxDropdownWidth,
  overrides: {},
  size: defaultProps.size,
};

export default function CountrySelect(props: CountrySelectPropsT) {
  const {
    country,
    disabled,
    inputRef,
    maxDropdownHeight,
    maxDropdownWidth,
    mapIsoToLabel,
    onCountryChange,
    overrides,
    size,
  } = props;
  const baseOverrides = {
    Root: {
      component: StyledRoot,
      props: {$size: size},
    },
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
        width: maxDropdownWidth,
        maxWidth: 'calc(100vw - 10px)',
      },
    },
    Dropdown: {
      component: CountrySelectDropdown,
      props: {
        country: country,
        maxDropdownHeight: maxDropdownHeight,
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
    Popover: {
      props: {
        placement: PLACEMENT.bottomLeft,
      },
    },
  };
  const [Select, selectProps] = getOverrides(
    overrides.CountrySelect,
    DefaultSelect,
  );
  const selectOverrides = mergeOverrides(baseOverrides, overrides);
  const [DialCode, dialCodeProps] = getOverrides(
    overrides.DialCode,
    StyledDialCode,
  );
  return (
    <Block display="flex" alignItems="center">
      <Select
        size={size}
        value={[country]}
        disabled={disabled}
        onChange={event => {
          onCountryChange(event);
          // After choosing a country, shift focus to the text input
          if (inputRef && inputRef.current) {
            inputRef.current.focus();
          }
        }}
        options={Object.values(COUNTRIES)}
        clearable={false}
        searchable={false}
        getValueLabel={(value: {option: CountryT}) => {
          return <StyledFlag iso={value.option.id} $size={size} />;
        }}
        overrides={selectOverrides}
        {...selectProps}
      />
      <DialCode data-e2e="phone-input-dialcode" {...dialCodeProps}>
        {country.dialCode}
      </DialCode>
    </Block>
  );
}
