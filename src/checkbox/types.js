/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides.js';
import {STYLE_TYPE} from './constants.js';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';
export type StyleTypeT = $Keys<typeof STYLE_TYPE>;

export type OverridesT = {
  Checkmark?: OverrideT<*>,
  Label?: OverrideT<*>,
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
  Toggle?: OverrideT<*>,
  ToggleInner?: OverrideT<*>,
  ToggleTrack?: OverrideT<*>,
};

export type DefaultPropsT = {
  children?: React$Node,
  checked: boolean,
  disabled: boolean,
  isError: boolean,
  autoFocus: boolean,
  isIndeterminate: boolean,
  inputRef: {current: HTMLInputElement | null},
  checkmarkType: StyleTypeT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onMouseDown: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onMouseUp: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type PropsT = {
  /** Component or String value for label of checkbox. */
  children?: React$Node,
  overrides?: OverridesT,
  /** Check or uncheck the control. */
  checked?: boolean,
  /** Disable the checkbox from being changed. */
  disabled?: boolean,
  /** Marks the checkbox as required. */
  required?: boolean,
  /** Renders checkbox in errored state. */
  isError?: boolean,
  /** Used to get a ref to the input element. Useful for programmatically focusing the input */
  inputRef: {current: HTMLInputElement | null},
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean,
  /** Passed to the input element type attribute */
  type?: string,
  /** Passed to the input element name attribute */
  name?: string,
  /** Passed to the input element value attribute */
  value?: string,
  /** Indicates a 'half' state for the checkmark. In this case, `checked` is ignored. */
  isIndeterminate?: boolean,
  /** How to position the label relative to the checkbox itself. */
  labelPlacement?: LabelPlacementT,
  /** Renders UI as checkmark or toggle switch. */
  checkmarkType: StyleTypeT,
  /** Text to display in native OS tooltip on long hover. */
  title?: ?string,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mousedown events on trigger element. */
  onMouseDown: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseup events on trigger element. */
  onMouseUp: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** handler for focus events on trigger element. */
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** handler for blur events on trigger element. */
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type StatelessStateT = {
  isFocused: boolean,
  isHovered: boolean,
  isActive: boolean,
};

export type StateT = {
  checked?: boolean,
  isIndeterminate?: boolean,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticInputEvent<HTMLInputElement>,
) => StateT;

export type DefaultStatefulPropsT = {
  initialState: StateT,
  children?: (*) => React$Node,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  /** Component or String value for label of checkbox. */
  children?: (*) => React$Node,
  /** Defines the components initial state value */
  initialState?: StateT,
  /** A state change handler. Used to override default state transitions. */
  stateReducer: StateReducerT,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for focus events on trigger element. */
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for blur events on trigger element. */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean,
};

export type StatefulCheckboxPropsT = {
  overrides?: OverridesT,
  /** Component or String value for label of checkbox. */
  children?: React$Node,
  /** Defines the components initial state value */
  initialState?: StateT,
  /** Focus the checkbox on initial render. */
  autoFocus?: boolean,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for focus events on trigger element. */
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for blur events on trigger element. */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type SharedStylePropsT = {
  $isFocused: boolean,
  $isHovered: boolean,
  $isActive: boolean,
  $isError: boolean,
  $checked: boolean,
  $isIndeterminate: boolean,
  $required: boolean,
  $disabled: boolean,
  $value: string,
  $checkmarkType: StyleTypeT,
  $labelPlacement: LabelPlacementT,
};
