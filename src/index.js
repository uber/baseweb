/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export {
  styled,
  withStyle,
  useStyletron,
  createThemedStyled,
  createThemedWithStyle,
  createThemedUseStyletron,
  ThemeProvider,
  ThemeConsumer,
} from './styles/index.js';
export {
  createTheme,
  lightThemePrimitives,
  darkThemePrimitives,
  darkThemeOverrides,
  DarkTheme,
  DarkThemeMove,
  LightTheme,
  LightThemeMove,
} from './themes/index.js';
export {default as LocaleProvider} from './locale/index.js';
export {default as BaseProvider} from './helpers/base-provider.js';
export {mergeOverrides} from './helpers/overrides.js';
export type {PrimitivesT} from './themes/types.js';
export type {ThemeT} from './styles/types.js';
