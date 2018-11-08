/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator';
import {primitives as lightThemePrimitives} from './light-theme';

export const LightTheme = createTheme(lightThemePrimitives);

export const LightThemeMove = createTheme({
  ...lightThemePrimitives,
  primaryFontFamily:
    'UberMoveText, "Open Sans", "Helvetica Neue", Helvetica, sans-serif',
});
export * from './types';
