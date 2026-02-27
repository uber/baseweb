/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useEffect } from 'react';
import { LightTheme } from '../themes';
import { createCSSVarTheme } from '../stylex/theme-proxy';
import { createReadableCSSVarTheme } from '../stylex/theme-proxy-readable';
import { getThemeClassName } from '../stylex/theme-classes';

import type { Theme } from './types';

export const ThemeContext: React.Context<Theme> = React.createContext(LightTheme);

export type ThemeProviderProps = {
  theme: Theme;
  useCSSVars?: boolean;
  /**
   * Use human-readable CSS variable names (--bui-background-primary)
   * instead of optimized hashed names (--x1q4dcxg).
   * Requires importing 'baseui/dist/baseui-theme-readable.css' instead of 'baseui/dist/stylex.css'
   */
  useReadableClassNames?: boolean;
};

const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = (props) => {
  const { theme, children, useCSSVars = true, useReadableClassNames = false } = props;

  // Apply theme class or data-theme attribute
  useEffect(() => {
    if (useCSSVars && typeof document !== 'undefined') {
      if (useReadableClassNames) {
        // Use data-theme attribute for readable version
        document.documentElement.setAttribute('data-theme', theme.name);

        // Remove any StyleX theme classes
        document.documentElement.className = document.documentElement.className
          .split(' ')
          .filter(c => !c.match(/^x[0-9a-z]{7}$/))
          .join(' ');
      } else {
        // Use StyleX theme class for optimized version
        const themeClass = getThemeClassName(theme.name as 'light' | 'dark');

        if (themeClass) {
          // Remove any existing theme classes
          document.documentElement.className = document.documentElement.className
            .split(' ')
            .filter(c => !c.match(/^x[0-9a-z]{7}$/))
            .join(' ');

          // Add the new theme class
          document.documentElement.classList.add(themeClass);
        }

        // Remove data-theme if present
        document.documentElement.removeAttribute('data-theme');
      }
    }

    return () => {
      if (useCSSVars && typeof document !== 'undefined') {
        // Cleanup: remove theme classes on unmount
        document.documentElement.className = document.documentElement.className
          .split(' ')
          .filter(c => !c.match(/^x[0-9a-z]{7}$/))
          .join(' ');
        document.documentElement.removeAttribute('data-theme');
      }
    };
  }, [theme.name, useCSSVars, useReadableClassNames]);

  // Use appropriate CSS var theme if enabled, otherwise use provided theme
  let activeTheme = theme;
  if (useCSSVars) {
    activeTheme = useReadableClassNames
      ? createReadableCSSVarTheme(theme.name as 'light' | 'dark')
      : createCSSVarTheme(theme.name as 'light' | 'dark');
  }

  return <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
