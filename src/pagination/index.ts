/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SIZE } from '../input';
import type { StatefulContainerState, StateReducerFn } from './types';

export { default as Pagination } from './pagination';
export { default as StatefulPagination } from './stateful-pagination';
export { default as StatefulContainer } from './stateful-container';
export { SIZE };
export { StyledRoot, StyledMaxLabel, StyledDropdownContainer } from './styled-components';
// Constants
export { STATE_CHANGE_TYPE } from './constants';
// Flow
export * from './types';
export type { PaginationLocale } from './locale';
/** @deprecated use StatefulContainerState instead. To be removed in future versions.*/
export type State = StatefulContainerState;
/** @deprecated use StateReducerFn instead. To be removed in future versions.*/
export type StateReducer = StateReducerFn;
