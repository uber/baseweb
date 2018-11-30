/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node} from 'react';
import type {ThemeT} from '../styles/types';
import type {OverrideT} from '../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT<*>,
  Separator?: OverrideT<*>,
  Icon?: OverrideT<*>,
};

export type BreadcrumbsPropsT = {
  children?: Node,
  overrides?: OverridesT,
};

export type StyledRootPropsT = {
  $theme: ThemeT,
};

export type StyledSeparatorT = {
  $theme: ThemeT,
};
