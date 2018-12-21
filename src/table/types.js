/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type TablePropsT = {
  columns: Array<string>,
  data: Array<Array<any>>,
  estimatedRowSize?: number,
  isLoading?: boolean,
  overrides?: OverridesT,
  useDynamicRowHeight?: boolean,
};

export type OverridesT = {
  Root?: OverrideT<*>,
  Head?: OverrideT<*>,
  HeadCell?: OverrideT<*>,
  Body?: OverrideT<*>,
  Row?: OverrideT<*>,
  Cell?: OverrideT<*>,
};

export type SharedStylePropsT = {|
  $theme: ThemeT,
|};
