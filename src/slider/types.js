/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

export type ChangeActionT = $Keys<typeof STATE_CHANGE_TYPE>;
export type ParamsT = {
  value: Array<number>,
};
export type OverridesT = {
  Root?: OverrideT<*>,
  Track?: OverrideT<*>,
  InnerTrack?: OverrideT<*>,
  Tick?: OverrideT<*>,
  TickBar?: OverrideT<*>,
  Thumb?: OverrideT<*>,
  InnerThumb?: OverrideT<*>,
  ThumbValue?: OverrideT<*>,
};

export type PropsT = {
  /** Selected points chosen on axis. It can be a single point (one thumb) or 2 points array (range thumbs). */
  value: Array<number>,
  /** All points present on slider axis. First and last point represent min and max
   * value. Each `Point` can be a value itself (for primitive type) or if `Point` is
   * `Object` it should have `value` and `label`. If more than 2 elements are present
   * in array, they represent all ticks on axis and `step` property is ignored.
   */
  range: Array<number | {value: number, label: React.Node}>,
  /** If `range` contains only min and max points (2 elements) step is to shift thumb
   * every time user moves it left or right. If `step` in place `value` for each `Point`
   * should be of primitive type.
   */
  step?: ?number,
  overrides?: OverridesT,
  /** Disable control from being changed. */
  disabled?: boolean,
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange: ({
    ...ParamsT,
  }) => void,
};

export type StateT = {
  value: Array<number>,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children: (*) => React$Node,
  /** Initial state populated into the component */
  initialState?: StateT,
  /** Reducer function to manipulate internal state updates. */
  stateReducer: StateReducerT,
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange: ({...ParamsT}) => void,
};

export type StatefulSliderPropsT = {
  overrides?: OverridesT,
  /** Initial state populated into the component */
  initialState: StateT,
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange?: ({...ParamsT}) => void,
};
