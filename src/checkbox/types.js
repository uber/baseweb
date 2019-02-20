/*
Copyright (c) 2018 Uber Technologies, Inc.

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
  inputRef: {current: ?HTMLInputElement},
  checkmarkType: StyleTypeT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
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
  inputRef: {current: ?HTMLInputElement},
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
  $theme?: *,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mousedown events on trigger element. */
  onMouseDown: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseup events on trigger element. */
  onMouseUp: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** handler for focus events on trigger element. */
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** handler for blur events on trigger element. */
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
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
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
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
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for focus events on trigger element. */
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for blur events on trigger element. */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
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
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for focus events on trigger element. */
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Handler for blur events on trigger element. */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
