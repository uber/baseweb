/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';

export type LabelPlacement = 'left' | 'right';

export type CheckboxOverrides = {
  Checkmark?: Override;
  CheckmarkContainer?: Override;
  Label?: Override;
  Root?: Override;
  Input?: Override;
};

export type DefaultProps = {
  overrides?: any;
  children?: React.ReactNode;
  checked: boolean;
  disabled: boolean;
  error: boolean;
  autoFocus: boolean;
  isIndeterminate: boolean;
  labelPlacement: LabelPlacement;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onMouseEnter: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onMouseLeave: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onMouseDown: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onMouseUp: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onFocus: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
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
  /** Ids of element which this checkbox controls, may be useful when there is a master checkbox controlling multiple child checkboxes - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-controls */
  'aria-controls'?: string;
  /** Component or String value for label of checkbox. */
  children?: React.ReactNode;
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
  inputRef?: React.RefObject<HTMLInputElement>;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
  /** Passed to the input element id attribute */
  id?: string;
  /** Passed to the input element name attribute */
  name?: string;
  /** Passed to the input element value attribute */
  value?: string;
  /** Indicates a 'half' state for the checkmark. In this case, `checked` is ignored. */
  isIndeterminate?: boolean;
  /** How to position the label relative to the checkbox itself. */
  labelPlacement?: LabelPlacement;
  /** Text to display in native OS tooltip on long hover. */
  title?: string | null;
  /** Handler for change events on trigger element. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mousedown events on trigger element. */
  onMouseDown?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseup events on trigger element. */
  onMouseUp?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** handler for focus events on trigger element. */
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** handler for blur events on trigger element. */
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for keydown events on trigger element. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** Handler for keyup events on trigger element. */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
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
  event: React.ChangeEvent<HTMLInputElement>
) => CheckboxReducerState;

export type StatefulContainerChildProps = {
  overrides?: CheckboxOverrides;
  /** Handler for change events on trigger element. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mousedown events on trigger element. */
  onMouseDown?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseup events on trigger element. */
  onMouseUp?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for focus events on trigger element. */
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for blur events on trigger element. */
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for keydown events on trigger element. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** Handler for keyup events on trigger element. */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
} & CheckboxReducerState;

export type StatefulContainerProps = {
  overrides?: CheckboxOverrides;
  /** Component or String value for label of checkbox. */
  children?: (a: StatefulContainerChildProps) => React.ReactNode;
  /** Defines the components initial state value */
  initialState?: CheckboxReducerState;
  /** A state change handler. Used to override default state transitions. */
  stateReducer?: StateReducer;
  /** Handler for change events on trigger element. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mousedown events on trigger element. */
  onMouseDown?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for mouseup events on trigger element. */
  onMouseUp?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for focus events on trigger element. */
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for blur events on trigger element. */
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Handler for keydown events on trigger element. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** Handler for keyup events on trigger element. */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
};

export type StatefulCheckboxProps = Omit<StatefulContainerProps, 'children'> &
  Omit<CheckboxProps, 'value' | keyof DefaultProps> &
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
  $labelPlacement?: LabelPlacement;
};
