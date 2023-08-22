/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import deepMerge from '../../utils/deep-merge';
import { LightTheme } from '../light-theme/light-theme';
import type { Theme } from '../../styles/types';

export const LightThemeMove: Theme = deepMerge({}, LightTheme, {
  name: 'light-theme-with-move',
});
