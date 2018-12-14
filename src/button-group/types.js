/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {KIND, SIZE, SHAPE} from '../button/index.js';
import type {
  SharedStylePropsT as GenericStylePropsT,
  ButtonPropsT as GenericButtonPropsT,
} from '../button/index.js';
import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/index.js';

import {MODE} from './constants.js';

// styled-components
export type StylePropsT = {
  ...GenericStylePropsT,
  $first: boolean,
  $last: boolean,
  $selected: boolean,
  $theme: ThemeT,
};

// button-group
export type PropsT = {|
  ariaLabel?: string,
  children: Array<React.Node>,
  disabled?: boolean,
  kind?: $Values<typeof KIND>,
  mode?: $Values<typeof MODE>,
  onChange?: ChangeHandlerT,
  onClick?: ClickHandlerT,
  overrides?: OverridesT<StylePropsT>,
  selected?: number | Array<number>,
  shape?: $Values<typeof SHAPE>,
  size?: $Values<typeof SIZE>,
|};

type OverridesT<T> = {
  Root?: OverrideT<T>,
};

// stateful-container
export type StatefulContainerPropsT = {|
  ...PropsT,
  children: (props: {
    ...StatefulContainerPropsT,
    onChange: ChangeHandlerT,
    onClick: ClickHandlerT,
    selected: number | Array<number>,
  }) => React.Node,
|};

export type StateT = {
  selected: Array<number>,
};

// button
export type ButtonPropsT = {
  ...GenericButtonPropsT,
  first?: boolean,
  last?: boolean,
  selected?: boolean,
};

// general
type ChangeHandlerT = (
  event: SyntheticEvent<HTMLButtonElement>,
  value: number,
) => mixed;

type ClickHandlerT = (
  event: SyntheticEvent<HTMLButtonElement>,
  index: number,
) => mixed;
