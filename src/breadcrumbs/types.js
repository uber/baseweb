/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node} from 'react';

import type {OverrideT} from '../helpers/overrides.js';

export type OverridesT = {
  Root?: OverrideT<*>,
  Separator?: OverrideT<*>,
  List?: OverrideT<*>,
  ListItem?: OverrideT<*>,
  Icon?: OverrideT<*>,
};

export type BreadcrumbsPropsT = {|
  children?: Node,
  overrides?: OverridesT,
  ariaLabel?: string,
|};
