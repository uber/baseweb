/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ComponentProps } from 'react';
import React, { useState } from 'react';

import {
  StyledRoot,
  StyledFlagContainer,
  StyledCountrySelectDropdownListItem as DefaultListItem,
  StyledCountrySelectDropdownFlagColumn as DefaultFlagColumn,
  StyledCountrySelectDropdownNameColumn as DefaultNameColumn,
  StyledCountrySelectDropdownDialcodeColumn as DefaultDialcodeColumn,
} from './styled-components';
import { SingleSelect as DefaultSelect } from '../select';
import { PLACEMENT } from '../popover';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import defaultProps from './default-props';
import { iso2FlagEmoji } from './utils';

import type { Country, CountrySelectProps } from './types';

CountryPicker.defaultProps = {
  disabled: defaultProps.disabled,
  inputRef: { current: null },
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  maxDropdownWidth: defaultProps.maxDropdownWidth,
  overrides: {},
  size: defaultProps.size,
  error: defaultProps.error,
  positive: defaultProps.positive,
  required: defaultProps.required,
};

const DropdownListItem = React.forwardRef<HTMLLIElement, ComponentProps<typeof DefaultListItem>>(
  (props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, ...rest } = props;
    return (
      <DefaultListItem ref={ref} {...rest}>
        {props.children}
      </DefaultListItem>
    );
  }
);
DropdownListItem.displayName = 'DropdownListItem';

// @ts-ignore
function DropdownOptionContent(props) {
  return <>{props.children}</>;
}

export default function CountryPicker(props: CountrySelectProps) {
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
  const [resetScrollIndex, setResetScrollIndex] = useState(false);
  const sharedProps = {
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $required: required,
    $size: size,
  };
  const options = Object.values(props.countries);
  const scrollIndex = options.findIndex((opt) => opt.id === country.id);
  const baseSelectOverrides = {
    Root: {
      component: StyledRoot,
    },
    Input: {
      style: {
        width: 0,
      },
      props: {
        // https://github.com/uber/baseweb/issues/3846
        autoComplete: 'chrome-off',
        'aria-label': 'Select country',
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
        // @ts-ignore
        stateReducer: (type, nextState) => {
          const next = {
            ...nextState,
            highlightedIndex: resetScrollIndex ? 0 : nextState.highlightedIndex,
          };
          setResetScrollIndex(false);
          return next;
        },
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
          CountrySelectDropdownListItem: overrides.CountrySelectDropdownListItem,
          CountrySelectDropdownFlagColumn: overrides.CountrySelectDropdownFlagColumn,
          CountrySelectDropdownNameColumn: overrides.CountrySelectDropdownNameColumn,
          CountrySelectDropdownDialcodeColumn: overrides.CountrySelectDropdownDialcodeColumn,
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
        focusLock: false,
        placement: PLACEMENT.bottomLeft,
      },
    },
  };

  const [Select, selectProps] = getOverrides(overrides.CountrySelect, DefaultSelect);
  const selectOverrides = mergeOverrides(baseSelectOverrides, {
    Dropdown: overrides.CountrySelectDropdown || {},
    DropdownListItem: overrides.CountrySelectDropdownListItem || {},
  });
  selectProps.overrides = mergeOverrides(selectOverrides, selectProps.overrides);

  const [FlagColumn, flagColumnProps] = getOverrides(
    overrides.CountrySelectDropdownFlagColumn,
    DefaultFlagColumn
  );
  const [FlagContainer, flagContainerProps] = getOverrides(
    overrides.FlagContainer,
    StyledFlagContainer
  );
  const [NameColumn, nameColumnProps] = getOverrides(
    overrides.CountrySelectDropdownNameColumn,
    DefaultNameColumn
  );
  const [Dialcode, dialcodeProps] = getOverrides(
    overrides.CountrySelectDropdownDialcodeColumn,
    DefaultDialcodeColumn
  );

  return (
    <Select
      clearable={false}
      disabled={disabled}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      getOptionLabel={({ option, optionState }) => {
        const iso = option.id;
        return (
          <>
            <FlagColumn {...flagColumnProps}>
              <FlagContainer $iso={iso} data-iso={iso} {...flagContainerProps}>
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
      getValueLabel={(value: { option: Country }) => {
        const iso = value.option.id;
        return (
          <FlagContainer $iso={iso} data-iso={iso} {...sharedProps} {...flagContainerProps}>
            {iso2FlagEmoji(iso)}
          </FlagContainer>
        );
      }}
      error={error}
      maxDropdownHeight={maxDropdownHeight}
      // @ts-ignore
      onChange={(event) => {
        if (typeof onCountryChange === 'function') {
          onCountryChange(event);
        } else if (__DEV__) {
          console.warn(
            'CountryPicker component is controlled (or stateless) ' +
              'and requires an `onCountryChange` handler to be passed in ' +
              'that handles the `country` prop value update.'
          );
        }
        // After choosing a country, shift focus to the text input
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      options={options}
      positive={positive}
      required={required}
      size={size}
      value={[country]}
      onInputChange={() => {
        setResetScrollIndex(true);
      }}
      {...selectProps}
    />
  );
}
