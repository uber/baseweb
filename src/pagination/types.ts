/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';
import { SIZE } from '../input';

export type Labels = {
  prevButton?: string;
  nextButton?: string;
  preposition?: string;
};

export type Size = keyof typeof SIZE;

export type Callbacks = {
  /** Callback for prev button click. */
  onPrevClick?: (a: { event: any }) => any;
  /** Callback for next button click. */
  onNextClick?: (a: { event: any }) => any;
  /** Callback for when page changes. */
  onPageChange?: (a: { nextPage: number; prevPage: number }) => any;
};

export type StateReducerFn = (
  changeType: keyof typeof STATE_CHANGE_TYPE,
  changes: StatefulContainerState,
  currentState: StatefulContainerState
) => StatefulContainerState;

export type PaginationOverrides = {
  Root?: Override;
  PrevButton?: Override;
  NextButton?: Override;
  MaxLabel?: Override;
  DropdownContainer?: Override;
  Select?: Override;
};

export type PaginationProps = Callbacks & {
  /** Max number of pages. */
  numPages: number;
  /** The current page. */
  currentPage: number;
  /** Set of labels to use for the buttons and preposition. */
  labels?: Labels;
  overrides?: PaginationOverrides;
  size?: Size;
};

export type StatefulPaginationProps = Callbacks & {
  /** Max number of pages. */
  numPages: number;
  /** Set of labels to use for the buttons and preposition. */
  labels?: Labels;
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerFn;
  /** Initial state populated into the component */
  initialState?: StatefulContainerState;
  overrides?: PaginationOverrides;
  size?: Size;
};

export type StatefulContainerProps = {
  children: any;
  numPages: number;
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerFn;
  /** Initial state populated into the component */
  initialState?: StatefulContainerState;
  /** Callback for when page changes. */
  onPageChange?: Callbacks['onPageChange'];
};

export type StatefulContainerState = {
  currentPage: number;
};
