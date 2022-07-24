/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPE, ADJOINED, SIZE, ENHANCER_POSITION } from './constants';

import type { SyntheticEvent, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

export type Adjoined = keyof typeof ADJOINED;
export type Size = keyof typeof SIZE;
export type StateType = keyof typeof STATE_CHANGE_TYPE;

export type InternalState = {
  /** Renders UI in 'focus' state */
  isFocused?: boolean;
  /** Renders input in 'masked' state if type equals "password" */
  isMasked?: boolean;
  /** Tracks if focus should be visible on the clear button. */
  isFocusVisibleForClear?: boolean;
  /** Tracks if focus should be visible on the mask toggle button. */
  isFocusVisibleForMaskToggle?: boolean;
};

export type State = {
  value?: string | number;
};

export type StateReducer = (stateType: StateType, nextState: State, currentState: State) => State;

export type SharedProps = {
  /** Renders UI in 'focus' state */
  $isFocused?: boolean;
  /** Renders UI in 'readOnly' state */
  $isReadOnly?: boolean;
  /** Renders UI in 'disabled' state */
  $disabled?: boolean;
  /** Renders UI in 'error' state */
  $error?: boolean;
  /** Renders UI in 'positive' state */
  $positive?: boolean;
  /** Defines styles for inputs that are grouped with other controls. */
  $adjoined: Adjoined;
  /** Renders UI in provided size. */
  $size: Size;
  /** Renders UI in 'required' state */
  $required?: boolean;
  $position?: keyof typeof ENHANCER_POSITION;
  /** Defines if has a clearable or MaskToggleButton at the end */
  $hasIconTrailing?: boolean;
};

export type BaseInputOverrides = {
  InputContainer?: Override;
  Input?: Override;
  Before?: Override;
  After?: Override;
  ClearIcon?: Override;
  ClearIconContainer?: Override;
  MaskToggleButton?: Override;
  MaskToggleShowIcon?: Override;
  MaskToggleHideIcon?: Override;
};

export type InputOverrides = {
  Root?: Override;
  StartEnhancer?: Override;
  EndEnhancer?: Override;
} & BaseInputOverrides;

export type BaseInputProps<T> = {
  'aria-activedescendant'?: string;
  'aria-autocomplete'?: string;
  'aria-controls'?: string;
  /** Id of element which contains a related error message */
  'aria-errormessage'?: string;
  /** Sets aria-haspopup attribute. */
  'aria-haspopup'?: string;
  /** Sets aria-label attribute. */
  'aria-label'?: string;
  /** Sets aria-labelledby attribute. */
  'aria-labelledby'?: string;
  /** Sets aria-describedby attribute. */
  'aria-describedby'?: string;
  /** Defines styles for inputs that are grouped with other controls. */
  adjoined?: Adjoined;
  /** Determines if browser should provide value suggestions. */
  autoComplete?: string;
  /** If true the input will be focused on the first mount. */
  autoFocus?: boolean;
  /** Renders component in 'disabled' state. */
  disabled?: boolean;
  /** Renders component in 'error' state. */
  error?: boolean;
  /** Renders component in 'positive' state. */
  positive?: boolean;
  /** A regex that is used to validate the value of the input on form submission. The Input component must be wrapped in a form element */
  pattern?: string;
  /** Id attribute value to be added to the input element and as a label's for attribute value. */
  id?: string;
  'data-baseweb'?: string;
  /** A  hint as to the type of data that might be entered by the user while editing the element or its contents. */
  inputMode?: string;
  /** A ref to access an input element. */
  inputRef?: React.RefObject<T>;
  name?: string;
  onBlur?: (e: FocusEvent<T>) => void;
  onChange?: (e: ChangeEvent<T>) => void;
  onKeyDown?: (e: KeyboardEvent<T>) => void;
  onKeyPress?: (e: KeyboardEvent<T>) => void;
  onKeyUp?: (e: KeyboardEvent<T>) => void;
  onFocus?: (e: FocusEvent<T>) => void;
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean;
  /** If undefined or true, clears the input when the Escape button is pressed with the input focused. True by default. */
  clearOnEscape?: boolean;
  maxLength?: number;
  onClear?: (e: SyntheticEvent<T>) => void;
  overrides?: BaseInputOverrides;
  placeholder?: string;
  /** Renders component in 'required' state. */
  required?: boolean;
  /** Input role attribute. */
  role?: string;
  /** Renders component in provided size. */
  size?: Size;
  /** Input type attribute. */
  type?: string;
  /** Input value attribute. */
  value?: string | number;
  rows?: number;
  /** min value when used as input type=number */
  min?: number;
  /** max value when used as input type=number */
  max?: number;
  /** step value when used as input type=number */
  step?: number | 'any';
  /** Renders component in 'readOnly' state. */
  readOnly?: boolean;
};

export type InputProps = {
  overrides?: InputOverrides;
  /** An input helper rendered before and attached to the input field. */
  startEnhancer?: React.ReactNode | ((props: SharedProps) => React.ReactNode);
  /** An input helper rendered after and attached to the input field. */
  endEnhancer?: React.ReactNode | ((props: SharedProps) => React.ReactNode);
  /** Handler for the `focus` event. */
  onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Handler for the `blur` event. */
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
} & BaseInputProps<HTMLInputElement | HTMLTextAreaElement>;

export type MaskedInputProps = Partial<
  {
    /** See mask examples here: https://github.com/sanniassin/react-input-mask */
    mask?: string;
    /** Character to render for unfilled mask element. */
    maskChar?: string;
  } & InputProps
>;

export type StatefulContainerChildrenProps<T> = {
  onChange: (e: ChangeEvent<T>) => void;
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean;
} & StatefulInputProps;

export type StatefulContainerProps<T> = {
  children: (props: StatefulContainerChildrenProps<T>) => React.ReactNode;
  /** Initial state of an uncontrolled input component. */
  initialState?: State;
  /** A state change handler. Used to override default state transitions. */
  stateReducer?: StateReducer;
  onChange?: (e: ChangeEvent<T>) => void;
  /** If true, adds a clear value icon button to the end of the input container. */
  clearable?: boolean;
} & {
  overrides?: InputOverrides;
} & Omit<InputProps, 'overrides' | 'children'>;

type OmitProps = {
  overrides: InputOverrides;
  children:
    | ((props: StatefulContainerChildrenProps<HTMLInputElement>) => React.ReactNode)
    | undefined
    | null;
};

type FullStProps = InputProps & StatefulContainerProps<HTMLInputElement | HTMLTextAreaElement>;

export type StInputPropsDiff = Omit<FullStProps, 'overrides' | 'children'>;

export type StatefulInputProps = {
  overrides?: InputOverrides;
} & StInputPropsDiff;
