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

export type PaginationPropsT = {
  numPages: number,
  currentPage: number,
  labels: LabelsT,
  overrides?: OverridesT,
  onPrevClick?: ({event: *}) => *,
  onNextClick?: ({event: *}) => *,
  onPageChange?: ({nextPage: number, prevPage: number}) => *,
};

export type PaginationStateT = {
  isMenuOpen: boolean,
};

export type StatefulPaginationPropsT = {
  numPages: number,
  labels: LabelsT,
  stateReducer?: StateReducerFnT,
  initialState?: StatefulContainerStateT,
  overrides?: OverridesT,
  onPageChange?: (nextPage: number, prevPage: number) => *,
  onPrevClick?: (event: *) => *,
  onNextClick?: (event: *) => *,
};

export type StatefulContainerPropsT = {
  children: *,
  numPages: number,
  stateReducer?: StateReducerFnT,
  initialState?: StatefulContainerStateT,
  onPageChange?: (nextPage: number, prevPage: number) => *,
};

export type StatefulContainerStateT = {
  currentPage: number,
};
