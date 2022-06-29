/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

import type { ReactNode } from 'react';

export type ChangeAction = keyof typeof STATE_CHANGE_TYPE;
export type Params = {
  value: Array<number>;
};
export type SliderOverrides = {
  Root?: Override;
  Track?: Override;
  InnerTrack?: Override;
  Tick?: Override;
  TickBar?: Override;
  Thumb?: Override;
  InnerThumb?: Override;
  ThumbValue?: Override;
  Mark?: Override;
};

export type SliderProps = {
  /** Position of the thumbs. It can be a single point (one thumb) or 2 points array (range thumbs). */
  value: Array<number>;
  /** The minimum allowed value of the slider. Should not be bigger than max. */
  min?: number;
  /** The maximum allowed value of the slider. Should not be smaller than min. */
  max?: number;
  /** The granularity the slider can step through value. Default step is 1. */
  step?: number;
  overrides?: SliderOverrides;
  /** Disable control from being changed. */
  disabled?: boolean;
  /** Display a mark at each step. */
  marks?: boolean;
  /** Always display the selected value/thumb/label. */
  persistentThumb?: boolean;
  /** Function to change the numeric value to a user friendly value. Also applied to min/max labels. */
  valueToLabel?: (value: number) => ReactNode;
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange?: (a: Params) => unknown;
  /** Handler for events on trigger element, each time thumbs finish changing selection, which is passed in `value`. */
  onFinalChange?: (a: Params) => unknown;
};

export type State = {
  value: Array<number>;
};

export type StateReducer = (stateType: string, nextState: State, currentState: State) => State;

export type StatefulContainerProps = {
  overrides?: SliderOverrides;
  children: (a: SliderProps) => ReactNode;
  min: number;
  max: number;
  step: number;
  /** Initial state populated into the component */
  initialState?: State;
  /** Reducer function to manipulate internal state updates. */
  stateReducer: StateReducer;
  /** Handler for events on trigger element, each time thumbs change selection, which is passed in `value`. */
  onChange: (a: {} & Params) => unknown;
  /** Handler for events on trigger element, each time thumbs finish changing selection, which is passed in `value`. */
  onFinalChange: (a: {} & Params) => unknown;
};

export type StatefulSliderProps = {
  /** Initial state populated into the component */
  initialState?: State;
} & Omit<SliderProps, 'value'>;

export type StyleProps = {
  $disabled?: boolean;
  $isDragged?: boolean;
  $marks?: boolean;
  $max?: number;
  $min?: number;
  $thumbIndex?: number;
  $value?: Array<number>;
  $isFocusVisible?: boolean;
};
