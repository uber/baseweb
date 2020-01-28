/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {
  STATE_CHANGE_TYPE,
  ADJOINED,
  SIZE,
  ENHANCER_POSITION,
} from './constants.js';

export type AdjoinedT = $Keys<typeof ADJOINED>;

export type SizeT = $Keys<typeof SIZE>;

export type StateTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type InternalStateT = {
  /** Renders UI in 'focus' state */
  isFocused?: boolean,
  /** Renders input in 'masked' state if type equals "password" */
  isMasked?: boolean,
};

export type StateT = {
  value?: string,
};

export type StateReducerT = (
  stateType: StateTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type SharedPropsT = {|
  /** Renders UI in 'focus' state */
  $isFocused: boolean,
  /** Renders UI in 'disabled' state */
  $disabled: boolean,
  /** Renders UI in 'error' state */
  $error: boolean,
  /** Renders UI in 'positive' state */
  $positive: boolean,
  /** Defines styles for inputs that are grouped with other controls. */
  $adjoined: AdjoinedT,
  /** Renders UI in provided size. */
  $size: SizeT,
  /** Renders UI in 'required' state */
  $required: boolean,
  $position: $Keys<typeof ENHANCER_POSITION>,
|};

export type PropsT = *;

export type BaseInputComponentsT = {|
  InputContainer?: OverrideT<*>,
  Input?: OverrideT<*>,
  Before?: OverrideT<*>,
  After?: OverrideT<*>,
  ClearIcon?: OverrideT<*>,
  ClearIconContainer?: OverrideT<*>,
  MaskToggleButton?: OverrideT<*>,
  MaskToggleShowIcon?: OverrideT<*>,
  MaskToggleHideIcon?: OverrideT<*>,
|};

export type InputComponentsT = {|
  ...BaseInputComponentsT,
  Root?: OverrideT<*>,
  StartEnhancer?: OverrideT<*>,
  EndEnhancer?: OverrideT<*>,
|};

export type BaseInputPropsT<T> = {|
  /** Sets aria-label attribute. */
  'aria-label'?: string,
  /** Sets aria-labelledby attribute. */
  'aria-labelledby'?: string,
  /** Sets aria-describedby attribute. */
  'aria-describedby'?: string,
  /** Defines styles for inputs that are grouped with other controls. */
  adjoined?: AdjoinedT,
  /** Determines if browser should provide value suggestions. */
  autoComplete?: string,
  /** If true the input will be focused on the first mount. */
  autoFocus: boolean,
  /** Renders component in 'disabled' state. */
  disabled: boolean,
  /** Renders component in 'error' state. */
  error: boolean,
  /** Renders component in 'positive' state. */
  positive?: boolean,
  /** A regex that is used to validate the value of the input on form submission. */
  pattern?: string,
  /** Id attribute value to be added to the input element and as a label's for attribute value. */
  id?: string,
  'data-baseweb'?: string,
  /** A  hint as to the type of data that might be entered by the user while editing the element or its contents. */
  inputMode?: string,
  /** A ref to access an input element. */
  inputRef?: React.ElementRef<*>,
  name: string,
  onBlur: (e: SyntheticFocusEvent<T>) => mixed,
  onChange?: (e: SyntheticInputEvent<T>) => mixed,
  onKeyDown?: (e: SyntheticKeyboardEvent<T>) => mixed,
  onKeyPress?: (e: SyntheticKeyboardEvent<T>) => mixed,
  onKeyUp?: (e: SyntheticKeyboardEvent<T>) => mixed,
  onFocus: (e: SyntheticFocusEvent<T>) => mixed,
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean,
  onClear?: (e: SyntheticEvent<T>) => mixed,
  overrides: BaseInputComponentsT,
  placeholder?: string,
  /** Renders component in 'required' state. */
  required: boolean,
  /** Renders component in provided size. */
  size: SizeT,
  /** Input type attribute. */
  type?: string,
  /** Input value attribute. */
  value?: string,
  rows?: number,
  /** min value when used as input type=number */
  min?: number,
  /** max value when used as input type=number */
  max?: number,
|};

export type InputPropsT = {|
  ...BaseInputPropsT<HTMLInputElement>,
  overrides: InputComponentsT,
  /** An input helper rendered before and attached to the input field. */
  startEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  /** An input helper rendered after and attached to the input field. */
  endEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  /** Handler for the `focus` event. */
  onFocus: (e: SyntheticFocusEvent<HTMLInputElement>) => mixed,
  /** Handler for the `blur` event. */
  onBlur: (e: SyntheticFocusEvent<HTMLInputElement>) => mixed,
|};

export type MaskedInputPropsT = $Shape<{|
  /** See pattern examples here: https://github.com/sanniassin/react-input-mask */
  mask?: string,
  /** Character to render for unfilled mask element. */
  maskChar?: string,
  ...InputPropsT,
|}>;

export type StatefulContainerPropsT<T> = {|
  children: (props: PropsT) => React.Node,
  /** Initial state of an uncontrolled input component. */
  initialState?: StateT,
  /** A state change handler. Used to override default state transitions. */
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<T>) => mixed,
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean,
  ...StatefulInputPropsT,
|};

type OmitPropsT = {
  overrides: InputComponentsT,
  children: ?(props: *) => React.Node,
};

type FullStPropsT = InputPropsT & StatefulContainerPropsT<HTMLInputElement>;

export type StInputPropsDiffT = $Diff<FullStPropsT, OmitPropsT>;

export type StatefulInputPropsT = {
  ...StInputPropsDiffT,
  overrides?: InputComponentsT,
};
