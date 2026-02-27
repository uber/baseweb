/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Theme, ColorTokens, Typography, Sizing, Animation } from '../styles/types';

// Import breakpoints and other constants that remain as JavaScript
import breakpoints from '../themes/shared/breakpoints';
import grid from '../themes/shared/grid';
import borders from '../themes/shared/borders';
import lighting from '../themes/shared/lighting';
import getMediaQuery from '../themes/shared/media-query';

/**
 * Create a proxy object that returns human-readable CSS variable references
 * This version uses readable variable names like --bui-color-primary instead of hashed names
 */
function createReadableColorProxy(): ColorTokens {
  return new Proxy({} as ColorTokens, {
    get(target, prop: string) {
      // Map JavaScript property names to readable CSS variable names
      const cssVarMap: Record<string, string> = {
        // Primitives
        white: '--bui-color-white',
        black: '--bui-color-black',
        gray50: '--bui-color-gray-50',
        gray100: '--bui-color-gray-100',
        gray200: '--bui-color-gray-200',
        gray300: '--bui-color-gray-300',
        gray400: '--bui-color-gray-400',
        gray500: '--bui-color-gray-500',
        gray600: '--bui-color-gray-600',
        gray700: '--bui-color-gray-700',
        gray800: '--bui-color-gray-800',
        gray900: '--bui-color-gray-900',

        // Brand colors
        brandDefault50: '--bui-color-brand-50',
        brandDefault100: '--bui-color-brand-100',
        brandDefault200: '--bui-color-brand-200',
        brandDefault300: '--bui-color-brand-300',
        brandDefault400: '--bui-color-brand-400',
        brandDefault500: '--bui-color-brand-500',
        brandDefault600: '--bui-color-brand-600',
        brandDefault700: '--bui-color-brand-700',
        brandDefault800: '--bui-color-brand-800',
        brandDefault900: '--bui-color-brand-900',

        // Red
        red50: '--bui-color-red-50',
        red100: '--bui-color-red-100',
        red200: '--bui-color-red-200',
        red300: '--bui-color-red-300',
        red400: '--bui-color-red-400',
        red500: '--bui-color-red-500',
        red600: '--bui-color-red-600',
        red700: '--bui-color-red-700',
        red800: '--bui-color-red-800',
        red900: '--bui-color-red-900',

        // Green
        green50: '--bui-color-green-50',
        green100: '--bui-color-green-100',
        green200: '--bui-color-green-200',
        green300: '--bui-color-green-300',
        green400: '--bui-color-green-400',
        green500: '--bui-color-green-500',
        green600: '--bui-color-green-600',
        green700: '--bui-color-green-700',
        green800: '--bui-color-green-800',
        green900: '--bui-color-green-900',

        // Blue
        blue50: '--bui-color-blue-50',
        blue100: '--bui-color-blue-100',
        blue200: '--bui-color-blue-200',
        blue300: '--bui-color-blue-300',
        blue400: '--bui-color-blue-400',
        blue500: '--bui-color-blue-500',
        blue600: '--bui-color-blue-600',
        blue700: '--bui-color-blue-700',
        blue800: '--bui-color-blue-800',
        blue900: '--bui-color-blue-900',

        // Yellow
        yellow50: '--bui-color-yellow-50',
        yellow100: '--bui-color-yellow-100',
        yellow200: '--bui-color-yellow-200',
        yellow300: '--bui-color-yellow-300',
        yellow400: '--bui-color-yellow-400',
        yellow500: '--bui-color-yellow-500',
        yellow600: '--bui-color-yellow-600',
        yellow700: '--bui-color-yellow-700',
        yellow800: '--bui-color-yellow-800',
        yellow900: '--bui-color-yellow-900',

        // Semantic - Background
        backgroundPrimary: '--bui-background-primary',
        backgroundSecondary: '--bui-background-secondary',
        backgroundTertiary: '--bui-background-tertiary',
        backgroundInversePrimary: '--bui-background-inverse-primary',
        backgroundInverseSecondary: '--bui-background-inverse-secondary',
        backgroundStateDisabled: '--bui-background-state-disabled',
        backgroundOverlay: '--bui-background-overlay',
        backgroundAccent: '--bui-background-accent',
        backgroundNegative: '--bui-background-negative',
        backgroundWarning: '--bui-background-warning',
        backgroundPositive: '--bui-background-positive',
        backgroundAccentLight: '--bui-background-accent-light',
        backgroundNegativeLight: '--bui-background-negative-light',
        backgroundWarningLight: '--bui-background-warning-light',
        backgroundPositiveLight: '--bui-background-positive-light',
        backgroundAlwaysDark: '--bui-background-always-dark',
        backgroundAlwaysLight: '--bui-background-always-light',

        // Semantic - Content
        contentPrimary: '--bui-content-primary',
        contentSecondary: '--bui-content-secondary',
        contentTertiary: '--bui-content-tertiary',
        contentInversePrimary: '--bui-content-inverse-primary',
        contentInverseSecondary: '--bui-content-inverse-secondary',
        contentInverseTertiary: '--bui-content-inverse-tertiary',
        contentStateDisabled: '--bui-content-state-disabled',
        contentOnColor: '--bui-content-on-color',
        contentOnColorInverse: '--bui-content-on-color-inverse',
        contentAccent: '--bui-content-accent',
        contentNegative: '--bui-content-negative',
        contentWarning: '--bui-content-warning',
        contentPositive: '--bui-content-positive',

        // Semantic - Border
        borderOpaque: '--bui-border-opaque',
        borderTransparent: '--bui-border-transparent',
        borderSelected: '--bui-border-selected',
        borderInverseOpaque: '--bui-border-inverse-opaque',
        borderInverseTransparent: '--bui-border-inverse-transparent',
        borderInverseSelected: '--bui-border-inverse-selected',
        borderStateDisabled: '--bui-border-state-disabled',
        borderAccent: '--bui-border-accent',
        borderAccentLight: '--bui-border-accent-light',
        borderNegative: '--bui-border-negative',
        borderNegativeLight: '--bui-border-negative-light',
        borderWarning: '--bui-border-warning',
        borderWarningLight: '--bui-border-warning-light',
        borderPositive: '--bui-border-positive',
        borderPositiveLight: '--bui-border-positive-light',

        // Brand
        brandBackgroundPrimary: '--bui-brand-background-primary',
        brandBackgroundSecondary: '--bui-brand-background-secondary',
        brandBackgroundTertiary: '--bui-brand-background-tertiary',
        brandBackgroundDisabled: '--bui-brand-background-disabled',
        brandContentPrimary: '--bui-brand-content-primary',
        brandContentOnPrimary: '--bui-brand-content-on-primary',
        brandContentOnSecondary: '--bui-brand-content-on-secondary',
        brandContentOnTertiary: '--bui-brand-content-on-tertiary',
        brandContentDisabled: '--bui-brand-content-disabled',
        brandBorderAccessible: '--bui-brand-border-accessible',
        brandBorderSubtle: '--bui-brand-border-subtle',
      };

      const varName = cssVarMap[prop];
      return varName ? `var(${varName})` : undefined;
    },
  });
}

/**
 * Create a proxy for typography that returns CSS variables
 */
function createReadableTypographyProxy(): Typography {
  const fontObjects: any = {
    font100: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-100)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-100)',
    },
    font200: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-200)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-200)',
    },
    font300: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-300)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-300)',
    },
    font400: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-400)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-400)',
    },
    font550: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-550)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-550)',
    },
    font650: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-650)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-650)',
    },
    font750: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-750)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-750)',
    },
    font850: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-850)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-850)',
    },
    font950: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-950)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-950)',
    },
  };

  // Add aliases
  const aliases: any = {
    ParagraphSmall: fontObjects.font200,
    ParagraphMedium: fontObjects.font300,
    ParagraphLarge: fontObjects.font400,
    HeadingXSmall: fontObjects.font550,
    HeadingSmall: fontObjects.font650,
    HeadingMedium: fontObjects.font750,
    HeadingLarge: fontObjects.font850,
    HeadingXLarge: fontObjects.font950,
  };

  return {
    ...fontObjects,
    ...aliases,
  } as Typography;
}

/**
 * Create a proxy for sizing that returns CSS variables
 */
function createReadableSizingProxy(): Sizing {
  return new Proxy({} as Sizing, {
    get(target, prop: string) {
      // Convert camelCase to kebab-case
      const cssVarName = `--bui-sizing-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return `var(${cssVarName})`;
    },
  });
}

/**
 * Create a proxy for animation that returns CSS variables
 */
function createReadableAnimationProxy(): Animation {
  return new Proxy({} as Animation, {
    get(target, prop: string) {
      const varMap: Record<string, string> = {
        timing100: '--bui-animation-timing-100',
        timing200: '--bui-animation-timing-200',
        timing300: '--bui-animation-timing-300',
        easeLinear: '--bui-animation-ease-linear',
        easeDecelerate: '--bui-animation-ease-decelerate',
        easeAccelerate: '--bui-animation-ease-accelerate',
        easeInOutCurve: '--bui-animation-ease-in-out',
      };
      const varName = varMap[prop] || `--bui-animation-${prop}`;
      return `var(${varName})`;
    },
  });
}

/**
 * Create a complete theme object with human-readable CSS variables
 */
export function createReadableCSSVarTheme(themeName: 'light' | 'dark'): Theme {
  return {
    name: themeName,
    colors: createReadableColorProxy(),
    typography: createReadableTypographyProxy(),
    sizing: createReadableSizingProxy(),
    animation: createReadableAnimationProxy(),

    // These remain as JavaScript constants
    breakpoints,
    borders,
    direction: 'auto' as const,
    grid,
    lighting,
    mediaQuery: getMediaQuery(breakpoints),
    zIndex: { modal: 2000 },
  };
}
