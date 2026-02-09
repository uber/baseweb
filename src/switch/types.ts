/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { SIZE, LABEL_PLACEMENT } from './constants';

export type LabelPlacement = keyof typeof LABEL_PLACEMENT;

export type SwitchOverrides = {
  Toggle?: Override;
  ToggleTrack?: Override;
  Label?: Override;
  Root?: Override;
  Input?: Override;
};

export type SwitchProps = {
  /** Id of element which contains a related caption */
  'aria-describedby'?: string;
  /** Passed to the input element aria-label attribute. */
  ariaLabel?: string;
  'aria-label'?: string;
  /** Id of element which contains an error message */
  'aria-errormessage'?: string;
  /** Indicates whether the switch is in an error state */
  'aria-invalid'?: boolean;
  /** Component or String value for label of switch. */
  children?: React.ReactNode;
  /** Indicates if this switch children contain an interactive element (prevents the label from moving focus from the child element to the radio button) */
  containsInteractiveElement?: boolean;
  overrides?: SwitchOverrides;
  /** Check or uncheck the control. */
  checked?: boolean;
  /** Disable the switch from being changed. */
  disabled?: boolean;
  /** Marks the switch as required. */
  required?: boolean;
  /** Used to get a ref to the input element. Useful for programmatically focusing the input */
  inputRef?: React.RefObject<HTMLInputElement>;
  /** Focus the switch on initial render. */
  autoFocus?: boolean;
  /** Passed to the input element id attribute */
  id?: string;
  /** Passed to the input element name attribute */
  name?: string;
  /** Passed to the input element value attribute */
  value?: string;
  /** How to position the label relative to the switch itself. */
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
  /** handler for keydown events on trigger element. */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** Handler for keyup events on trigger element. */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => unknown;
  /** size of switch component - both control and label(if existing) */
  size?: keyof typeof SIZE;
  /** whether show checkmark icon when switch is on */
  showIcon?: boolean;
};

export type SwitchState = {
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  isActive: boolean;
};

export type SwitchReducerState = {
  checked?: boolean;
};

export type StateReducer = (
  stateType: string,
  nextState: SwitchReducerState,
  currentState: SwitchReducerState,
  event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
) => SwitchReducerState;

export type StatefulContainerChildProps = {
  overrides?: SwitchOverrides;
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
  /** Focus the switch on initial render. */
  autoFocus?: boolean;
} & SwitchReducerState;

export type StatefulContainerProps = {
  overrides?: SwitchOverrides;
  /** Component or String value for label of switch. */
  children?: (a: StatefulContainerChildProps) => React.ReactNode;
  /** Defines the components initial state value */
  initialState?: SwitchReducerState;
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
  /** Focus the switch on initial render. */
  autoFocus?: boolean;
};

export type StatefulSwitchProps = Omit<StatefulContainerProps, 'children'> & Partial<SwitchProps>;

export type SharedStyleProps = {
  $isFocused: boolean;
  $isFocusVisible: boolean;
  $isHovered: boolean;
  $isActive: boolean;
  $checked: boolean;
  $required: boolean;
  $disabled: boolean;
  $value: string;
  $labelPlacement?: LabelPlacement;
  $showIcon?: boolean;
  $size?: keyof typeof SIZE;
};
