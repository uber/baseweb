/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export {styled, ThemeProvider} from './styles/index.js';
import LocaleProvider from './locale/index.js';
export {LocaleProvider};
export {
  createTheme,
  lightThemePrimitives,
  LightTheme,
  LightThemeMove,
} from './themes/index.js';
export {withProps} from './helpers/index.js';
export {mergeOverrides} from './helpers/overrides.js';
export type {PrimitivesT} from './themes/types.js';
export type {ThemeT} from './styles/types.js';
