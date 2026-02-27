/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as stylex from '@stylexjs/stylex';
import { lightTheme, darkTheme } from './vars.stylex';

// Pre-compute theme class names
export const LIGHT_THEME_CLASS = stylex.props(lightTheme).className || '';
export const DARK_THEME_CLASS = stylex.props(darkTheme).className || '';

export function getThemeClassName(themeName: 'light' | 'dark'): string {
  return themeName === 'dark' ? DARK_THEME_CLASS : LIGHT_THEME_CLASS;
}
