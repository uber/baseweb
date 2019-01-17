/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/types.js';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';

export type OverridesT = {
  RadioMark?: OverrideT<*>,
  Label?: OverrideT<*>,
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
};

export type DefaultPropsT = {
  value: string,
  disabled: boolean,
  isError: boolean,
  autoFocus: boolean,
  labelPlacement: LabelPlacementT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type PropsT = {
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
  align?: string,
  /** String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string. */
  name?: string,
  /** How to position the label relative to the radio itself. */
  labelPlacement?: LabelPlacementT,
  $theme?: ThemeT,
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

export type StateT = {
  value?: string,
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
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
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
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
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
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
