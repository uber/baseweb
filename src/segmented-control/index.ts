/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type {
  StatefulSegmentedControlState,
  StatefulSegmentedControlAction,
  StatefulSegmentedControlReducer,
} from './types';

export * from './constants';
export * from './stateful-segmented-control';
export * from './styled-components';
export * from './segment';
export * from './segmented-control';
export * from './utils';
export * from './types';

/** @deprecated use StatefulSegmentedControlState instead. To be removed in future versions.*/
export type State = StatefulSegmentedControlState;
/** @deprecated use StatefulSegmentedControlAction instead. To be removed in future versions.*/
export type Action = StatefulSegmentedControlAction;
/** @deprecated use StatefulSegmentedControlReducer instead. To be removed in future versions.*/
export type StateReducer = StatefulSegmentedControlReducer;
