/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { OverrideT } from '../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT;
};

export type PropsT = {
  overrides: OverridesT;
};
