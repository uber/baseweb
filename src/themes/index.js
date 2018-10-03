/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {default as LightThemeCreator} from './light-theme';

export const LightTheme = LightThemeCreator();

export const LightThemeMove = LightThemeCreator({
  primaryFontFamily:
    'UberMove, "Open Sans", "Helvetica Neue", Helvetica, sans-serif',
});
