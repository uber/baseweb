/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import {ALIGN} from './constants.js';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';
export type AlignT = $Keys<typeof ALIGN>;

export type RadioOverridesT = {
  RadioMarkInner?: OverrideT<*>,
  RadioMarkOuter?: OverrideT<*>,
  Label?: OverrideT<*>,
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
  Description?: OverrideT<*>,
};

export type RadioGroupOverridesT = {
  RadioGroupRoot?: OverrideT<*>,
};

export type OverridesT = {
  ...$Exact<RadioOverridesT>,
  ...$Exact<RadioGroupOverridesT>,
};

export type DefaultPropsT = {
  value: string,
  disabled: boolean,
  isError: boolean,
  autoFocus: boolean,
  labelPlacement: LabelPlacementT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type PropsT = {
  /**
   * Used to define a string that labels the radio group. Use this prop if the label is not
   * visible on screen. If the label is visible, use the 'aria-labeledby' prop instead.
   */
  'aria-label'?: string,
  /**
   * Establishes a relationship between the radio group and its label. Screen readers use this
   * attribute to catalog the object on a page so that users can navigate between them.
   */
  'aria-labelledby'?: string,
  // This prop will be deprecated in the next major update. Pass overrides to the 'Radio' component instead.
  overrides?: OverridesT,
  /** As `children` in React native approach represents radio buttons inside of Radio Group. Can use `Radio` from this package. */
  children?: Array<React.Node>,
  /** The value of radio button, which is preselected. */
  value?: string,
  /** Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them. */
  disabled?: boolean,
  /** Set if the control is required to be checked. */
  required?: boolean,
  /** Sets radio group into error state. */
  isError?: boolean,
  /** Set to be focused (active) on selected\checked radio. */
  autoFocus?: boolean,
  /** How to position radio buttons in the group. */
  align?: AlignT,
  /** String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string. */
  name?: string,
  /** How to position the label relative to the radio itself. */
  labelPlacement?: LabelPlacementT,
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

export type StateT = {
  value?: string,
};

export type RadioPropsT = {
  /** Focus the radio on initial render. */
  autoFocus?: boolean,
  /** Check or uncheck the control. */
  checked?: boolean,
  /** Label of radio. */
  children?: React$Node,
  /** Add more detail about a radio element. */
  description?: string,
  /** Disable the checkbox from being changed. */
  disabled?: boolean,
  /** Used to get a ref to the input element. Useful for programmatically focusing the input */
  inputRef: React.ElementRef<*>,
  /** Renders checkbox in errored state. */
  isError?: boolean,
  /** How to position the label relative to the checkbox itself. */
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left',
  /** Passed to the input element name attribute */
  name?: string,
  /** handler for blur events on trigger element. */
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** handler for focus events on trigger element. */
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseenter events on trigger element. */
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseleave events on trigger element. */
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mousedown events on trigger element. */
  onMouseDown?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Handler for mouseup events on trigger element. */
  onMouseUp?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  overrides?: OverridesT,
  /** Marks the checkbox as required. */
  required?: boolean,
  /** Passed to the input element value attribute */
  value?: string,
};

export type RadioStateT = {
  isActive: boolean,
  isFocused: boolean,
  isHovered: boolean,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticInputEvent<HTMLInputElement>,
) => StateT;

export type StatelessStateT = {};

export type DefaultStatefulPropsT = {
  initialState: StateT,
  children?: (props: PropsT) => React.Node,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  /** Should return `RadioGroup` instance with standard or customized inner elements. */
  children?: (props: PropsT) => React.Node,
  /** Initial state populated into the component */
  initialState?: StateT,
  /** Reducer function to manipulate internal state updates. */
  stateReducer: StateReducerT,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Set to be focused (active) on selected\checked radio. */
  autoFocus?: boolean,
};

export type StatefulRadioGroupPropsT = {
  overrides?: OverridesT,
  /** A list of `Radio` components. */
  children?: Array<React.Node>,
  /** Initial state populated into the component */
  initialState?: StateT,
  /** Set to be focused (active) on selected\checked radio. */
  autoFocus?: boolean,
  /** Handler for change events on trigger element. */
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export type StylePropsT = {
  $align?: boolean,
  $checked: boolean,
  $disabled: boolean,
  $hasDescription: boolean,
  $isActive: boolean,
  $isError: boolean,
  $isFocused: boolean,
  $isHovered: boolean,
  $labelPlacement: LabelPlacementT,
  $required: boolean,
  $value: string,
};
