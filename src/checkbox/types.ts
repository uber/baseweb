/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { OverrideT } from '../helpers/overrides';
import { STYLE_TYPE } from './constants';

import type { ReactNode, ChangeEvent } from 'react';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';
export type StyleTypeT = keyof typeof STYLE_TYPE;
export type ReactRefT<T> =
  | {
      current: null | T;
    }
  | {
      current: null | T;
    };

export type OverridesT = {
  Checkmark?: OverrideT;
  Label?: OverrideT;
  Root?: OverrideT;
  Input?: OverrideT;
  Toggle?: OverrideT;
  ToggleInner?: OverrideT;
  ToggleTrack?: OverrideT;
};

export type DefaultPropsT = {
  children?: ReactNode;
  checked: boolean;
  disabled: boolean;
  error: boolean;
  autoFocus: boolean;
  isIndeterminate: boolean;
  inputRef: ReactRefT<HTMLInputElement>;
  checkmarkType: StyleTypeT;
  onChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseEnter: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseLeave: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseDown: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseUp: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type PropsT = {
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
  overrides?: OverridesT;
  /** Check or uncheck the control. */
  checked?: boolean;
  /** Disable the checkbox from being changed. */
  disabled?: boolean;
  /** Marks the checkbox as required. */
  required?: boolean;
  /** Renders checkbox in errored state. */
  error?: boolean;
  /** Used to get a ref to the input element. Useful for programmatically focusing the input */
  inputRef: ReactRefT<HTMLInputElement>;
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
  labelPlacement?: LabelPlacementT;
  /** Renders UI as checkmark or toggle switch. */
  checkmarkType: StyleTypeT;
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

export type StatelessStateT = {
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  isActive: boolean;
};

export type StateT = {
  checked?: boolean;
  isIndeterminate?: boolean;
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: ChangeEvent<HTMLInputElement>
) => StateT;

export type StatefulContainerChildPropsT = {
  overrides?: OverridesT;
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
} & StateT;

export type DefaultStatefulPropsT = {
  initialState: StateT;
  children?: (a: StatefulContainerChildPropsT) => ReactNode;
  stateReducer: StateReducerT;
  onChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseEnter: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onMouseLeave: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => unknown;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT;
  /** Component or String value for label of checkbox. */
  children?: (a: StatefulContainerChildPropsT) => ReactNode;
  /** Defines the components initial state value */
  initialState?: StateT;
  /** A state change handler. Used to override default state transitions. */
  stateReducer: StateReducerT;
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

export type StatefulCheckboxPropsT = {
  overrides?: OverridesT;
  /** Component or String value for label of checkbox. */
  children?: ReactNode;
  /** Indicates if this checkbox children contain an interactive element (prevents the label from moving focus from the child element to the radio button) */
  containsInteractiveElement?: boolean;
  /** Defines the components initial state value */
  initialState?: StateT;
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean;
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
};

export type SharedStylePropsT = {
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
  $labelPlacement: LabelPlacementT;
};
