/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useEffect } from 'react';
import { LightTheme } from '../themes';
import { createCSSVarTheme } from '../stylex/theme-proxy';
import { getThemeClassName } from '../stylex/theme-classes';

import type { Theme } from './types';

export const ThemeContext: React.Context<Theme> = React.createContext(LightTheme);

export type ThemeProviderProps = {
  theme: Theme;
  useCSSVars?: boolean;
};

const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = (props) => {
  const { theme, children, useCSSVars = true } = props;

  // Apply StyleX theme class to document root
  useEffect(() => {
    if (useCSSVars && typeof document !== 'undefined') {
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
    }

    return () => {
      if (useCSSVars && typeof document !== 'undefined') {
        // Cleanup: remove theme classes on unmount
        document.documentElement.className = document.documentElement.className
          .split(' ')
          .filter(c => !c.match(/^x[0-9a-z]{7}$/))
          .join(' ');
      }
    };
  }, [theme.name, useCSSVars]);

  // Use CSS var theme if enabled, otherwise use provided theme
  const activeTheme = useCSSVars
    ? createCSSVarTheme(theme.name as 'light' | 'dark')
    : theme;

  return <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
