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
  StyledCountrySelectContainer,
  StyledCountrySelectDropdownListItem as DefaultListItem,
  StyledCountrySelectDropdownFlagColumn as DefaultFlagColumn,
  StyledCountrySelectDropdownNameColumn as DefaultNameColumn,
  StyledCountrySelectDropdownDialcodeColumn as DefaultDialcodeColumn,
} from './styled-components.js';
import {COUNTRIES} from './constants.js';
import {SingleSelect as DefaultSelect} from '../select/index.js';
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

const DropdownListItem = React.forwardRef((props, ref) => {
  const {children, ...rest} = props;
  return (
    <DefaultListItem ref={ref} {...rest}>
      {props.children}
    </DefaultListItem>
  );
});

function DropdownOptionContent(props) {
  return <>{props.children}</>;
}

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
  const options = Object.values(COUNTRIES);
  // $FlowFixMe
  const scrollIndex = options.findIndex(opt => opt.id === country.id);
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
    StatefulMenu: {
      props: {
        initialState: {
          isFocused: true,
          highlightedIndex: scrollIndex,
        },
      },
    },
    DropdownContainer: {
      style: {
        width: maxDropdownWidth,
        maxWidth: 'calc(100vw - 10px)',
      },
    },
    Dropdown: {
      props: {
        $country: country,
        $maxDropdownHeight: maxDropdownHeight,
        $mapIsoToLabel: mapIsoToLabel,
        $overrides: {
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
    DropdownListItem: {
      component: DropdownListItem,
    },
    OptionContent: {
      component: DropdownOptionContent,
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
  // $FlowFixMe
  const selectOverrides = mergeOverrides(baseOverrides, {
    Dropdown: overrides.CountrySelectDropdown,
    DropdownListItem: overrides.CountrySelectDropdownListItem,
  });
  // $FlowFixMe
  selectProps.overrides = mergeOverrides(
    selectOverrides,
    // $FlowFixMe
    selectProps.overrides,
  );

  const [CountrySelectContainer, countrySelectContainerProps] = getOverrides(
    overrides.CountrySelectContainer,
    StyledCountrySelectContainer,
  );
  const [FlagColumn, flagColumnProps] = getOverrides(
    overrides.CountrySelectDropdownFlagColumn,
    DefaultFlagColumn,
  );
  const [FlagContainer, flagContainerProps] = getOverrides(
    overrides.FlagContainer,
    StyledFlagContainer,
  );
  const [NameColumn, nameColumnProps] = getOverrides(
    overrides.CountrySelectDropdownNameColumn,
    DefaultNameColumn,
  );
  const [Dialcode, dialcodeProps] = getOverrides(
    overrides.CountrySelectDropdownDialcodeColumn,
    DefaultDialcodeColumn,
  );
  const [DialCode, dialCodeProps] = getOverrides(
    overrides.DialCode,
    StyledDialCode,
  );

  return (
    <CountrySelectContainer {...countrySelectContainerProps}>
      <Select
        clearable={false}
        disabled={disabled}
        getOptionLabel={({option, optionState}) => {
          const iso = option.id;
          return (
            <>
              <FlagColumn {...flagColumnProps}>
                <FlagContainer
                  $iso={iso}
                  data-iso={iso}
                  {...flagContainerProps}
                >
                  {iso2FlagEmoji(iso)}
                </FlagContainer>
              </FlagColumn>
              <NameColumn {...nameColumnProps}>
                {mapIsoToLabel ? mapIsoToLabel(iso) : option.label}
              </NameColumn>
              <Dialcode {...dialcodeProps}>{option.dialCode}</Dialcode>
            </>
          );
        }}
        getValueLabel={(value: {option: CountryT}) => {
          const iso = value.option.id;
          return (
            <FlagContainer
              $iso={iso}
              data-iso={iso}
              {...sharedProps}
              {...flagContainerProps}
            >
              {iso2FlagEmoji(iso)}
            </FlagContainer>
          );
        }}
        error={error}
        maxDropdownHeight={maxDropdownHeight}
        onChange={event => {
          onCountryChange(event);
          // After choosing a country, shift focus to the text input
          if (inputRef && inputRef.current) {
            inputRef.current.focus();
          }
        }}
        options={options}
        positive={positive}
        required={required}
        searchable={false}
        size={size}
        value={[country]}
        {...selectProps}
      />
      <DialCode {...sharedProps} {...dialCodeProps}>
        {country.dialCode}
      </DialCode>
    </CountrySelectContainer>
  );
}
