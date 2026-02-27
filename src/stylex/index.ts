/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as stylex from '@stylexjs/stylex';

export * from './colors.stylex';
export * from './typography.stylex';
export * from './spacing.stylex';
export * from './animation.stylex';
export * from './borders.stylex';
export * from './lighting.stylex';
export { lightTheme, darkTheme } from './vars.stylex';
export { createCSSVarTheme } from './theme-proxy';

// Apply the root styles to ensure they're included in the build
import { lightTheme, darkTheme } from './vars.stylex';

// Export a styles object that can be used to apply the theme
export const themeStyles = {
  light: lightTheme,
  dark: darkTheme,
};

// Create a small wrapper to ensure themes are included
export const applyTheme = (theme: 'light' | 'dark') => {
  return stylex.props(theme === 'light' ? lightTheme : darkTheme);
};
