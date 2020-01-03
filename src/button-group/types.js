/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {SIZE, SHAPE, KIND} from '../button/index.js';
import type {OverrideT} from '../helpers/overrides.js';

import {MODE, STATE_CHANGE_TYPE} from './constants.js';

// button-group
export type PropsT = {|
  /** Accessible label. */
  ariaLabel?: string,
  /** Set of more than one `Button` components */
  children: Array<React.Node>,
  /** Defines if the button group is disabled. */
  disabled?: boolean,
  /**
   * Use the `mode` prop to render toggleable Buttons:
   * the value `radio` will cause Buttons to behave like radio buttons,
   * the value `checkbox` will cause Buttons to behave like checkboxes.
   */
  mode?: $Values<typeof MODE>,
  /**
   * Called with click events from children. If a child button has its
   * own click handler, the local handler will be called first, then
   * this handler will trigger.
   */
  onClick?: ClickHandlerT,
  overrides?: OverridesT<*>,
  /**
   * Index or array of indices of the selected Button(s).
   * Primarily for use with controlled components with a `mode` prop defined.
   */
  selected?: number | Array<number>,
  /** Defines the shape of the buttons in the button group. */
  shape?: $Values<typeof SHAPE>,
  /** Defines the size of the buttons in the button group. */
  size?: $Values<typeof SIZE>,
  /** Defines the `kind` of the buttons in the group */
  kind?: $Values<typeof KIND>,
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
