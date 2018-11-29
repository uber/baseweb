/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node} from 'react';
import {KIND} from './constants';
import type {ThemeT} from '../styles/types';
import type {OverrideT} from '../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT<*>,
};

export type NotifcationPropsT = {
  children?: Node,
  overrides?: OverridesT,
  kind: $Values<typeof KIND>,
};

export type StyledRootPropsT = {
  $theme: ThemeT,
  $kind: $Values<typeof KIND>,
};
