/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Theme, ColorTokens, Typography, Sizing, Animation } from '../styles/types';
import { primitiveColors, foundationColors, alphaColors, semanticColors } from './colors.stylex';
import { fontFamilies, fontSizes, fontWeights, lineHeights } from './typography.stylex';
import { sizing } from './spacing.stylex';
import { animationTimings, animationCurves } from './animation.stylex';
import { borderRadius } from './borders.stylex';
import { shadows } from './lighting.stylex';

// Import breakpoints and other constants that remain as JavaScript
import breakpoints from '../themes/shared/breakpoints';
import grid from '../themes/shared/grid';
import borders from '../themes/shared/borders';
import lighting from '../themes/shared/lighting';
import getMediaQuery from '../themes/shared/media-query';

/**
 * Create a proxy object that returns CSS variable references for all theme tokens
 * This maintains backward compatibility with existing components that access theme via $theme
 */
function createColorProxy(): ColorTokens {
  const allColors = { ...primitiveColors, ...foundationColors, ...alphaColors, ...semanticColors };

  return new Proxy({} as ColorTokens, {
    get(target, prop: string) {
      // Check if the property exists in our StyleX variables
      if (prop in allColors) {
        // Convert the StyleX variable to a CSS var reference
        // StyleX vars are like: { variableName: 'var(--bui-color-name)' }
        const stylexVar = allColors[prop as keyof typeof allColors];
        return stylexVar;
      }
      return undefined;
    },
  });
}

/**
 * Create a proxy for typography that returns CSS variables
 */
function createTypographyProxy(): Typography {
  const fontObjects = {
    font100: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize100, fontWeight: fontWeights.fontWeightNormal, lineHeight: lineHeights.lineHeight100 },
    font150: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize100, fontWeight: fontWeights.fontWeight500, lineHeight: lineHeights.lineHeight150 },
    font200: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize200, fontWeight: fontWeights.fontWeightNormal, lineHeight: lineHeights.lineHeight200 },
    font250: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize200, fontWeight: fontWeights.fontWeight500, lineHeight: lineHeights.lineHeight250 },
    font300: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize300, fontWeight: fontWeights.fontWeightNormal, lineHeight: lineHeights.lineHeight300 },
    font350: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize300, fontWeight: fontWeights.fontWeight500, lineHeight: lineHeights.lineHeight350 },
    font400: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize400, fontWeight: fontWeights.fontWeightNormal, lineHeight: lineHeights.lineHeight400 },
    font450: { fontFamily: fontFamilies.primaryFontFamily, fontSize: fontSizes.fontSize400, fontWeight: fontWeights.fontWeight500, lineHeight: lineHeights.lineHeight450 },
    font550: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize550, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight550 },
    font650: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize650, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight650 },
    font750: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize750, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight750 },
    font850: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize850, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight850 },
    font950: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize950, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight950 },
    font1050: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize1050, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight1050 },
    font1150: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize950, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight950 },
    font1250: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize1250, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight1250 },
    font1350: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize1350, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight1350 },
    font1450: { fontFamily: fontFamilies.secondaryFontFamily, fontSize: fontSizes.fontSize1450, fontWeight: fontWeights.fontWeight700, lineHeight: lineHeights.lineHeight1450 },
  };

  const monoFonts: any = {};
  for (const [key, value] of Object.entries(fontObjects)) {
    const monoKey = `Mono${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    monoFonts[monoKey] = { ...value, fontFamily: fontFamilies.monoFontFamily };
  }

  const aliases = {
    ParagraphXSmall: fontObjects.font100,
    ParagraphSmall: fontObjects.font200,
    ParagraphMedium: fontObjects.font300,
    ParagraphLarge: fontObjects.font400,
    LabelXSmall: fontObjects.font150,
    LabelSmall: fontObjects.font250,
    LabelMedium: fontObjects.font350,
    LabelLarge: fontObjects.font450,
    HeadingXSmall: fontObjects.font550,
    HeadingSmall: fontObjects.font650,
    HeadingMedium: fontObjects.font750,
    HeadingLarge: fontObjects.font850,
    HeadingXLarge: fontObjects.font950,
    HeadingXXLarge: fontObjects.font1050,
    DisplayXSmall: fontObjects.font1150,
    DisplaySmall: fontObjects.font1250,
    DisplayMedium: fontObjects.font1350,
    DisplayLarge: fontObjects.font1450,
  };

  const monoAliases: any = {};
  for (const [key, value] of Object.entries(aliases)) {
    const monoKey = `Mono${key}`;
    monoAliases[monoKey] = { ...value, fontFamily: fontFamilies.monoFontFamily };
  }

  return {
    ...fontObjects,
    ...aliases,
    ...monoFonts,
    ...monoAliases,
  } as Typography;
}

/**
 * Create a proxy for sizing that returns CSS variables
 */
function createSizingProxy(): Sizing {
  return sizing as unknown as Sizing;
}

/**
 * Create a proxy for animation that returns CSS variables
 */
function createAnimationProxy(): Animation {
  return {
    ...animationTimings,
    ...animationCurves,
  } as unknown as Animation;
}

/**
 * Create a complete theme object that uses CSS variables
 * This function creates a theme that is fully compatible with existing components
 * while leveraging CSS custom properties for theming
 */
export function createCSSVarTheme(themeName: 'light' | 'dark'): Theme {
  return {
    name: themeName,
    colors: createColorProxy(),
    typography: createTypographyProxy(),
    sizing: createSizingProxy(),
    animation: createAnimationProxy(),

    // These remain as JavaScript constants as they're used in logic
    breakpoints,
    borders,
    direction: 'auto' as const,
    grid,
    lighting,
    mediaQuery: getMediaQuery(breakpoints),
    zIndex: { modal: 2000 },
  };
}
