/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { OverrideT } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';
import { SIZE } from '../input';

export type LabelsT = {
  prevButton?: string;
  nextButton?: string;
  preposition?: string;
};

export type SizeT = keyof typeof SIZE;

export type CallbacksT = {
  /** Callback for prev button click. */
  //flowlint-next-line unclear-type:off
  onPrevClick?: (a: { event: any }) => any;
  /** Callback for next button click. */
  //flowlint-next-line unclear-type:off
  onNextClick?: (a: { event: any }) => any;
  /** Callback for when page changes. */
  //flowlint-next-line unclear-type:off
  onPageChange?: (a: { nextPage: number; prevPage: number }) => any;
};

export type StateReducerFnT = (
  changeType: keyof typeof STATE_CHANGE_TYPE,
  changes: StatefulContainerStateT,
  currentState: StatefulContainerStateT
) => StatefulContainerStateT;

export type OverridesT = {
  Root?: OverrideT;
  PrevButton?: OverrideT;
  NextButton?: OverrideT;
  MaxLabel?: OverrideT;
  DropdownContainer?: OverrideT;
  Select?: OverrideT;
};

export type PaginationPropsT = CallbacksT & {
  /** Max number of pages. */
  numPages: number;
  /** The current page. */
  currentPage: number;
  /** Set of labels to use for the buttons and preposition. */
  labels?: LabelsT;
  overrides?: OverridesT;
  size?: SizeT;
};

export type StatefulPaginationPropsT = CallbacksT & {
  /** Max number of pages. */
  numPages: number;
  /** Set of labels to use for the buttons and preposition. */
  labels?: LabelsT;
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerFnT;
  /** Initial state populated into the component */
  initialState?: StatefulContainerStateT;
  overrides?: OverridesT;
};

export type StatefulContainerPropsT = {
  //flowlint-next-line unclear-type:off
  children: any;
  numPages: number;
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerFnT;
  /** Initial state populated into the component */
  initialState?: StatefulContainerStateT;
  /** Callback for when page changes. */
  onPageChange?: CallbacksT['onPageChange'];
};

export type StatefulContainerStateT = {
  currentPage: number;
};
