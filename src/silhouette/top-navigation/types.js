/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node} from 'react';
import type {OverrideT} from '../../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT<*>,
};

export type TopNavigationPropsT = {
  children?: Node,
  overrides?: OverridesT,
  height?: number,
};
