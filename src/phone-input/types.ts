/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { STATE_CHANGE_TYPE, SIZE, COUNTRIES } from './constants';
import type { Override } from '../helpers/overrides';
import type { OnChangeParams } from '../select';

export type Size = keyof typeof SIZE;
export type CountryIso = keyof typeof COUNTRIES;
export type Countries = Readonly<Country>;

export type Country = Readonly<{
  dialCode: string;
  id: CountryIso;
  label: string;
}>;

export type State = {
  country: Country;
  text: string;
};

export type StateChange = keyof typeof STATE_CHANGE_TYPE;

export type StateReducer = (
  type: StateChange,
  nextState: Partial<State>,
  currentState: State
) => State;

export type mapIsoToLabel = (iso: string) => string;

// Props

export type CountrySelectDropdownProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: Array<React.ReactElement<any>>;
  $country: Country;
  $mapIsoToLabel?: mapIsoToLabel;
  $maxDropdownHeight: string;
  $noResultsMsg: string;
  $overrides: {
    CountrySelectContainer?: Override;
    CountrySelectDropdown?: Override;
    CountrySelectDropdownListItem?: Override;
    CountrySelectDropdownFlagColumn?: Override;
    CountrySelectDropdownNameColumn?: Override;
    CountrySelectDropdownDialcodeColumn?: Override;
    FlagContainer?: Override;
    EmptyState?: Override;
  };
};

export type CountrySelectProps = {
  countries: {
    [x: string]: Country;
  };
  country: Country;
  disabled: boolean;
  error: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onCountryChange: (event: OnChangeParams) => unknown;
  mapIsoToLabel?: mapIsoToLabel;
  maxDropdownHeight: string;
  maxDropdownWidth: string;
  overrides: {
    CountrySelectContainer?: Override;
    CountrySelectDropdown?: Override;
    CountrySelectDropdownListItem?: Override;
    CountrySelectDropdownFlagColumn?: Override;
    CountrySelectDropdownNameColumn?: Override;
    CountrySelectDropdownDialcodeColumn?: Override;
    DialCode?: Override;
    CountrySelect?: Override;
    FlagContainer?: Override;
  };
  positive: boolean;
  required: boolean;
  size: Size;
};

export type PhoneInputOverrides = {
  Root?: Override;
  Input?: Override;
  CountrySelectContainer?: Override;
  CountrySelectDropdown?: Override;
  CountrySelectDropdownListItem?: Override;
  CountrySelectDropdownFlagColumn?: Override;
  CountrySelectDropdownNameColumn?: Override;
  CountrySelectDropdownDialcodeColumn?: Override;
  DialCode?: Override;
  CountrySelect?: Override;
  FlagContainer?: Override;
};
export type PhoneInputProps = {
  /** Sets aria-label attribute of the input element. */
  'aria-label': string | undefined | null;
  /** Sets aria-labelledby attribute of the input element. */
  'aria-labelledby': string | undefined | null;
  /** Sets aria-describedby attribute of the input element. */
  'aria-describedby': string | undefined | null;
  /** Defines the value of the country select. */
  country: Country;
  /** Defines if the component is disabled. */
  disabled: boolean;
  /** Renders component in 'error' state. */
  error: boolean;
  /** Sets the id attribute of the input element. */
  id: string | undefined | null;
  /** Sets the max height of the country select dropdown. */
  maxDropdownHeight: string;
  /** Sets the max width of the country select dropdown. */
  maxDropdownWidth: string;
  /** Function for mapping ISO codes to country names. Useful for localization of the country select dropdown. */
  mapIsoToLabel?: mapIsoToLabel;
  /** Sets the name attribute of the input element. */
  name: string | undefined | null;
  /** A handler for the country select's change events. */
  onCountryChange: (event: OnChangeParams) => unknown;
  /** A handler for the input element's change events. */
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
  overrides: PhoneInputOverrides;
  /** Sets the placeholder text for the input element.  */
  placeholder?: string;
  /** Renders component in 'positive' state. */
  positive: boolean;
  /** Sets the 'required' attribute of the input element. The country select will always have a value so does has no need for 'require'. */
  required: boolean;
  /** Sets the size of the component. */
  size: Size;
  /** Defines the value of the input element. */
  text: string;
  /** Defines if the input value is clearable. */
  clearable?: boolean;
};

export type PhoneInputLiteProps = {
  countries: {
    [x: string]: Country;
  };
} & PhoneInputProps;

export type StatefulPhoneInputContainerProps = {
  children: (a: PhoneInputProps) => React.ReactNode;
  initialState: State;
  stateReducer: StateReducer;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
  onCountryChange: (event: OnChangeParams) => unknown;
} & PhoneInputProps;

export type StatefulPhoneInputProps = PhoneInputProps & {
  initialState?: State;
  stateReducer?: StateReducer;
  onTextChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
  onCountryChange?: (event: OnChangeParams) => unknown;
};
