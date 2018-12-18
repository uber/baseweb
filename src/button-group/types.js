/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {KIND, SIZE, SHAPE} from '../button/index.js';
import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/index.js';

import {MODE, STATE_CHANGE_TYPE} from './constants.js';

// styled-components
export type StylePropsT = {
  $theme: ThemeT,
};

// button-group
export type PropsT = {|
  ariaLabel?: string,
  children: Array<React.Node>,
  disabled?: boolean,
  kind?: $Values<typeof KIND>,
  mode?: $Values<typeof MODE>,
  onClick?: ClickHandlerT,
  overrides?: OverridesT<StylePropsT>,
  selected?: number | Array<number>,
  shape?: $Values<typeof SHAPE>,
  size?: $Values<typeof SIZE>,
|};

type OverridesT<T> = {
  Root?: OverrideT<T>,
};

// stateful-group
// eslint-disable-next-line flowtype/generic-spacing
export type StatefulPropsT = $Diff<
  {|
    ...PropsT,
    initialState?: {selected: number | Array<number>},
    stateReducer?: StateReducerT,
  |},
  {selected: mixed}, // excluded from type definition
>;

// stateful-container
export type StatefulContainerPropsT = {|
  ...StatefulPropsT,
  children: (props: {
    ...$Diff<PropsT, {children: mixed}>,
    onClick: ClickHandlerT,
    selected: number | Array<number>,
  }) => React.Node,
|};

export type StateT = {
  selected: Array<number>,
};

export type StateReducerT = (
  stateType: $Values<typeof STATE_CHANGE_TYPE>,
  nextState: StateT,
  currentState: StateT,
) => StateT;

// general
type ClickHandlerT = (
  event: SyntheticEvent<HTMLButtonElement>,
  index: number,
) => mixed;
