/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT<*>,
  Action?: OverrideT<*>,
  ActionIcon?: OverrideT<*>,
};

export type PropsT = {
  overrides?: OverridesT,
  disabled?: boolean,
  isFocused?: boolean,
  isHovered?: boolean,
  children?: React$Node,
  color: string,
  $theme?: *,
  onActionClick: (
    e: SyntheticEvent<HTMLInputElement>,
    children?: React$Node,
  ) => void,
};
