/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

export type LabelsT = {
  prevButton?: string,
  nextButton?: string,
  preposition?: string,
};

export type CallbacksT = {
  /** Callback for prev button click. */
  onPrevClick?: ({event: *}) => *,
  /** Callback for next button click. */
  onNextClick?: ({event: *}) => *,
  /** Callback for when page changes. */
  onPageChange?: ({nextPage: number, prevPage: number}) => *,
};

export type StateReducerFnT = (
  changeType: $Keys<typeof STATE_CHANGE_TYPE>,
  changes: StatefulContainerStateT,
  currentState: StatefulContainerStateT,
) => StatefulContainerStateT;

export type OverridesT = {
  Root?: OverrideT<*>,
  PrevButton?: OverrideT<*>,
  NextButton?: OverrideT<*>,
  MaxLabel?: OverrideT<*>,
  DropdownContainer?: OverrideT<*>,
  Select?: OverrideT<*>,
};

export type PaginationPropsT = CallbacksT & {
  /** Max number of pages. */
  numPages: number,
  /** The current page. */
  currentPage: number,
  /** Set of labels to use for the buttons and preposition. */
  labels?: LabelsT,
  overrides?: OverridesT,
};

export type StatefulPaginationPropsT = CallbacksT & {
  /** Max number of pages. */
  numPages: number,
  /** Set of labels to use for the buttons and preposition. */
  labels?: LabelsT,
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerFnT,
  /** Initial state populated into the component */
  initialState?: StatefulContainerStateT,
  overrides?: OverridesT,
};

export type StatefulContainerPropsT = {
  children: *,
  numPages: number,
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerFnT,
  /** Initial state populated into the component */
  initialState?: StatefulContainerStateT,
  /** Callback for when page changes. */
  onPageChange?: $PropertyType<CallbacksT, 'onPageChange'>,
};

export type StatefulContainerStateT = {
  currentPage: number,
};
