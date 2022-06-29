/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { STYLE_TYPE } from './constants';

import type { ReactNode, ChangeEvent } from 'react';

export type LabelPlacement = 'top' | 'right' | 'bottom' | 'left';
export type StyleType = keyof typeof STYLE_TYPE;

export type CheckboxOverrides = {
  Checkmark?: Override;
  Label?: Override;
  Root?: Override;
  Input?: Override;
  Toggle?: Override;
  ToggleInner?: Override;
  ToggleTrack?: Override;
};

export type DefaultProps = {
  overrides?: any;
  children?: ReactNode;
  checked: boolean;
  disabled: boolean;
  error: boolean;
  type: string;
  autoFocus: boolean;
  isIndeterminate: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  checkmarkType: StyleType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseEnter: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseLeave: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseDown: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseUp: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => unknown;
  containsInteractiveElement?: boolean;
};

export type CheckboxProps = {
  /** Id of element which contains a related caption */
  'aria-describedby'?: string;
  /** Id of element which contains a related error message */
  'aria-errormessage'?: string;
  /** Passed to the input element aria-label attribute. */
  ariaLabel?: string;
  'aria-label'?: string;
  /** Component or String value for label of checkbox. */
  children?: ReactNode;
  /** Indicates if this checkbox children contain an interactive element (prevents the label from moving focus from the child element to the radio button) */
  containsInteractiveElement?: boolean;
  overrides?: CheckboxOverrides;
  /** Check or uncheck the control. */
  checked?: boolean;
  /** Disable the checkbox from being changed. */
  disabled?: boolean;
  /** Marks the checkbox as required. */
  required?: boolean;
  /** Renders checkbox in errored state. */
  error?: boolean;
  /** Used to get a ref to the input element. Useful for programmatically focusing the input */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
  /** Passed to the input element type attribute */
  type?: string;
  /** Passed to the input element name attribute */
  name?: string;
  /** Passed to the input element value attribute */
  value?: string;
  /** Indicates a 'half' state for the checkmark. In this case, `checked` is ignored. */
  isIndeterminate?: boolean;
  /** How to position the label relative to the checkbox itself. */
  labelPlacement?: LabelPlacement;
  /** Renders UI as checkmark or toggle switch. */
  checkmarkType: StyleType;
  /** Text to display in native OS tooltip on long hover. */
  title?: string | null;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mousedown events on trigger element. */
  onMouseDown: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseup events on trigger element. */
  onMouseUp: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** handler for focus events on trigger element. */
  onFocus: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** handler for blur events on trigger element. */
  onBlur: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type CheckboxState = {
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  isActive: boolean;
};

export type CheckboxReducerState = {
  checked?: boolean;
  isIndeterminate?: boolean;
};

export type StateReducer = (
  stateType: string,
  nextState: CheckboxReducerState,
  currentState: CheckboxReducerState,
  event: ChangeEvent<HTMLInputElement>
) => CheckboxReducerState;

export type StatefulContainerChildProps = {
  overrides?: CheckboxOverrides;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for focus events on trigger element. */
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for blur events on trigger element. */
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
} & CheckboxReducerState;

export type DefaultStatefulProps = {
  initialState: CheckboxReducerState;
  children?: (a: StatefulContainerChildProps) => ReactNode;
  stateReducer: StateReducer;
  onChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseEnter: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseLeave: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type StatefulContainerProps = {
  overrides?: CheckboxOverrides;
  /** Component or String value for label of checkbox. */
  children?: (a: StatefulContainerChildProps) => ReactNode;
  /** Defines the components initial state value */
  initialState?: CheckboxReducerState;
  /** A state change handler. Used to override default state transitions. */
  stateReducer: StateReducer;
  /** Handler for change events on trigger element. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for focus events on trigger element. */
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for blur events on trigger element. */
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => unknown;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
};

export type StatefulCheckboxProps = {
  /** Defines the components initial state value */
  initialState?: CheckboxReducerState;
} & Omit<CheckboxProps, 'value' | keyof DefaultProps> &
  Partial<DefaultProps>;

export type SharedStyleProps = {
  $isFocused: boolean;
  $isFocusVisible: boolean;
  $isHovered: boolean;
  $isActive: boolean;
  $error: boolean;
  $checked: boolean;
  $isIndeterminate: boolean;
  $required: boolean;
  $disabled: boolean;
  $value: string;
  $labelPlacement: LabelPlacement;
};
