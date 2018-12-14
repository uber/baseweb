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

export type StylePropsT = {
  ...GenericStylePropsT,
  $first: boolean,
  $last: boolean,
  $selected: boolean,
  $theme: ThemeT,
};

export type OverridesT<T> = {
  Root?: OverrideT<T>,
};

export type PropsT = {
  ariaLabel?: string,
  children: Array<React.Node>,
  disabled?: boolean,
  kind?: $Values<typeof KIND>,
  mode?: $Values<typeof MODE>,
  // todo, properly type this
  // should onChange accept the button index? or something else?
  onChange?: (value: ?number | Array<number>) => mixed,
  onClick?: (event: SyntheticEvent<HTMLButtonElement>, index: number) => mixed,
  overrides?: OverridesT<StylePropsT>,
  selected?: number | Array<number>,
  shape?: $Values<typeof SHAPE>,
  size?: $Values<typeof SIZE>,
};

export type ButtonPropsT = {
  ...GenericButtonPropsT,
  first?: boolean,
  last?: boolean,
  selected?: boolean,
};
