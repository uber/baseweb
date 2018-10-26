/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {OverrideT} from '../helpers/overrides';
import {STATE_CHANGE_TYPE} from './constants';

export type LabelsT = {
  prevButton?: string,
  nextButton?: string,
  preposition?: string,
};

export type CallbacksT = {
  onPrevClick?: ({event: *}) => *,
  onNextClick?: ({event: *}) => *,
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
  DropdownButton?: OverrideT<*>,
  DropdownMenu?: OverrideT<*>,
};

export type PaginationPropsT = CallbacksT & {
  numPages: number,
  currentPage: number,
  labels: LabelsT,
  overrides?: OverridesT,
};

export type PaginationStateT = {
  isMenuOpen: boolean,
};

export type StatefulPaginationPropsT = CallbacksT & {
  numPages: number,
  labels: LabelsT,
  stateReducer?: StateReducerFnT,
  initialState?: StatefulContainerStateT,
  overrides?: OverridesT,
};

export type StatefulContainerPropsT = {
  children: *,
  numPages: number,
  stateReducer?: StateReducerFnT,
  initialState?: StatefulContainerStateT,
  onPageChange?: $PropertyType<CallbacksT, 'onPageChange'>,
};

export type StatefulContainerStateT = {
  currentPage: number,
};
