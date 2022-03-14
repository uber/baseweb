/*
Copyright (c) Uber Technologies, Inc.

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
export type ReactRefT<T> = {|current: null | T|};

export type InternalStateT = {
  /** Renders UI in 'focus' state */
  isFocused?: boolean,
  /** Renders input in 'masked' state if type equals "password" */
  isMasked?: boolean,
  /** Tracks if focus should be visible on the clear button. */
  isFocusVisibleForClear?: boolean,
  /** Tracks if focus should be visible on the mask toggle button. */
  isFocusVisibleForMaskToggle?: boolean,
};

export type StateT = {
  value?: string | number,
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
  /** Defines if has a clearable or MaskToggleButton at the end */
  $hasIconTrailing: boolean,
|};

export type BaseInputComponentsT = {|
  InputContainer?: OverrideT,
  Input?: OverrideT,
  Before?: OverrideT,
  After?: OverrideT,
  ClearIcon?: OverrideT,
  ClearIconContainer?: OverrideT,
  MaskToggleButton?: OverrideT,
  MaskToggleShowIcon?: OverrideT,
  MaskToggleHideIcon?: OverrideT,
|};

export type InputComponentsT = {|
  ...BaseInputComponentsT,
  Root?: OverrideT,
  StartEnhancer?: OverrideT,
  EndEnhancer?: OverrideT,
|};

export type BaseInputPropsT<T> = {|
  'aria-activedescendant'?: string,
  'aria-autocomplete'?: string,
  'aria-controls'?: string,
  /** Id of element which contains a related error message */
  'aria-errormessage'?: string,
  /** Sets aria-haspopup attribute. */
  'aria-haspopup'?: string,
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
  error?: boolean,
  /** Renders component in 'positive' state. */
  positive?: boolean,
  /** A regex that is used to validate the value of the input on form submission. The Input component must be wrapped in a form element */
  pattern?: string,
  /** Id attribute value to be added to the input element and as a label's for attribute value. */
  id?: string,
  'data-baseweb'?: string,
  /** A  hint as to the type of data that might be entered by the user while editing the element or its contents. */
  inputMode?: string,
  /** A ref to access an input element. */
  inputRef?: ReactRefT<HTMLElement>,
  name: string,
  onBlur: (e: SyntheticFocusEvent<T>) => mixed,
  onChange?: (e: SyntheticInputEvent<T>) => mixed,
  onKeyDown?: (e: SyntheticKeyboardEvent<T>) => mixed,
  onKeyPress?: (e: SyntheticKeyboardEvent<T>) => mixed,
  onKeyUp?: (e: SyntheticKeyboardEvent<T>) => mixed,
  onFocus: (e: SyntheticFocusEvent<T>) => mixed,
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean,
  /** If undefined or true, clears the input when the Escape button is pressed with the input focused. True by default. */
  clearOnEscape?: boolean,
  maxLength?: number,
  onClear?: (e: SyntheticEvent<T>) => mixed,
  overrides: BaseInputComponentsT,
  placeholder?: string,
  /** Renders component in 'required' state. */
  required: boolean,
  /** Input role attribute. */
  role?: string,
  /** Renders component in provided size. */
  size: SizeT,
  /** Input type attribute. */
  type?: string,
  /** Input value attribute. */
  value?: string | number,
  rows?: number,
  /** min value when used as input type=number */
  min?: number,
  /** max value when used as input type=number */
  max?: number,
  /** step value when used as input type=number */
  step?: number,
|};

export type InputPropsT = {|
  ...BaseInputPropsT<HTMLInputElement>,
  overrides: InputComponentsT,
  /** An input helper rendered before and attached to the input field. */
  startEnhancer: ?(React.Node | ((props: SharedPropsT) => React.Node)),
  /** An input helper rendered after and attached to the input field. */
  endEnhancer: ?(React.Node | ((props: SharedPropsT) => React.Node)),
  /** Handler for the `focus` event. */
  onFocus: (e: SyntheticFocusEvent<HTMLInputElement>) => mixed,
  /** Handler for the `blur` event. */
  onBlur: (e: SyntheticFocusEvent<HTMLInputElement>) => mixed,
|};

export type MaskedInputPropsT = $Shape<{|
  ...InputPropsT,
  /** See mask examples here: https://github.com/sanniassin/react-input-mask */
  mask?: string,
  /** Character to render for unfilled mask element. */
  maskChar?: string,
|}>;

export type StatefulContainerChildrenPropsT<T> = {|
  onChange: (e: SyntheticInputEvent<T>) => mixed,
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean,
  ...StatefulInputPropsT,
|};

export type StatefulContainerPropsT<T> = {|
  children: (props: StatefulContainerChildrenPropsT<T>) => React.Node,
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
  children: ?(
    props: StatefulContainerChildrenPropsT<HTMLInputElement>,
  ) => React.Node,
};

type FullStPropsT = InputPropsT & StatefulContainerPropsT<HTMLInputElement>;

export type StInputPropsDiffT = $Diff<FullStPropsT, OmitPropsT>;

export type StatefulInputPropsT = {
  ...StInputPropsDiffT,
  overrides?: InputComponentsT,
};
