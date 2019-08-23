/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {
  StyledRoot,
  StyledFlagContainer,
  StyledDialCode,
} from './styled-components.js';
import {COUNTRIES} from './constants.js';
import CountrySelectDropdown from './country-select-dropdown.js';
import {Block} from '../block/index.js';
import {Select as DefaultSelect} from '../select/index.js';
import {PLACEMENT} from '../popover/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import defaultProps from './default-props.js';
import {iso2FlagEmoji} from './utils.js';

import type {CountryT, CountrySelectPropsT} from './types.js';

CountrySelect.defaultProps = {
  disabled: defaultProps.disabled,
  inputRef: {current: null},
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  maxDropdownWidth: defaultProps.maxDropdownWidth,
  overrides: {},
  size: defaultProps.size,
};

export default function CountrySelect(props: CountrySelectPropsT) {
  const {
    country,
    disabled,
    error,
    inputRef,
    maxDropdownHeight,
    maxDropdownWidth,
    mapIsoToLabel,
    onCountryChange,
    overrides,
    positive,
    required,
    size,
  } = props;
  const sharedProps = {
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $required: required,
    $size: size,
  };
  const baseOverrides = {
    Root: {
      component: StyledRoot,
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
        country,
        maxDropdownHeight,
        mapIsoToLabel,
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
          FlagContainer: overrides.FlagContainer,
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

  const [FlagContainer, flagContainerProps] = getOverrides(
    overrides.FlagContainer,
    StyledFlagContainer,
  );

  // $FlowFixMe
  selectProps.overrides = mergeOverrides(baseOverrides, selectProps.overrides);
  const [DialCode, dialCodeProps] = getOverrides(
    overrides.DialCode,
    StyledDialCode,
  );
  return (
    <Block display="flex" alignItems="center">
      <Select
        clearable={false}
        disabled={disabled}
        getValueLabel={(value: {option: CountryT}) => {
          return (
            <FlagContainer
              $iso={value.option.id}
              {...sharedProps}
              {...flagContainerProps}
            >
              {iso2FlagEmoji(value.option.id)}
            </FlagContainer>
          );
        }}
        error={error}
        onChange={event => {
          onCountryChange(event);
          // After choosing a country, shift focus to the text input
          if (inputRef && inputRef.current) {
            inputRef.current.focus();
          }
        }}
        options={Object.values(COUNTRIES)}
        positive={positive}
        required={required}
        searchable={false}
        size={size}
        value={[country]}
        {...selectProps}
      />
      <DialCode
        data-e2e="phone-input-dialcode"
        {...sharedProps}
        {...dialCodeProps}
      >
        {country.dialCode}
      </DialCode>
    </Block>
  );
}
