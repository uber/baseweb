/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { OverrideT } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

import type { ReactNode } from 'react';

export type ChangeActionT = keyof typeof STATE_CHANGE_TYPE;
export type ParamsT = {
  value: Array<number>;
};
export type OverridesT = {
  Root?: OverrideT;
  Track?: OverrideT;
  InnerTrack?: OverrideT;
  Tick?: OverrideT;
  TickBar?: OverrideT;
  Thumb?: OverrideT;
  InnerThumb?: OverrideT;
  ThumbValue?: OverrideT;
  Mark?: OverrideT;
};

export type PropsT = {
  /** Position of the thumbs. It can be a single point (one thumb) or 2 points array (range thumbs). */
  value: Array<number>;
  /** The minimum allowed value of the slider. Should not be bigger than max. */
  min?: number;
  /** The maximum allowed value of the slider. Should not be smaller than min. */
  max?: number;
  /** The granularity the slider can step through value. Default step is 1. */
  step?: number;
  overrides?: OverridesT;
  /** Disable control from being changed. */
  disabled?: boolean;
  /** Display a mark at each step. */
  marks?: boolean;
  /** Always display the selected value/thumb/label. */
  persistentThumb?: boolean;
  /** Function to change the numeric value to a user friendly value. Also applied to min/max labels. */
  valueToLabel?: (value: number) => ReactNode;
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange?: (a: ParamsT) => unknown;
  /** Handler for events on trigger element, each time thumbs finish changing selection, which is passed in `value`. */
  onFinalChange?: (a: ParamsT) => unknown;
};

export type StateT = {
  value: Array<number>;
};

export type StateReducerT = (stateType: string, nextState: StateT, currentState: StateT) => StateT;

export type StatefulContainerPropsT = {
  overrides?: OverridesT;
  children: (a: PropsT) => ReactNode;
  min: number;
  max: number;
  step: number;
  /** Initial state populated into the component */
  initialState?: StateT;
  /** Reducer function to manipulate internal state updates. */
  stateReducer: StateReducerT;
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange: (a: {} & ParamsT) => unknown;
  /** Handler for events on trigger element, each time thumbs finish changing selection, which is passed in `value`. */
  onFinalChange: (a: {} & ParamsT) => unknown;
};

export type StatefulSliderPropsT = {
  /** Initial state populated into the component */
  initialState?: StateT;
} & Omit<PropsT, 'value'>;

export type StylePropsT = {
  $disabled?: boolean;
  $isDragged?: boolean;
  $marks?: boolean;
  $max?: number;
  $min?: number;
  $thumbIndex?: number;
  $value?: Array<number>;
  $isFocusVisible?: boolean;
};
