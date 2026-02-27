/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as stylex from '@stylexjs/stylex';

/**
 * Typography Tokens
 */

// Font families
export const fontFamilies = stylex.defineVars({
  primaryFontFamily: 'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
  secondaryFontFamily: 'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
  monoFontFamily: 'UberMoveMono, "Lucida Console", Monaco, monospace',
});

// Font sizes
export const fontSizes = stylex.defineVars({
  fontSize100: '12px',
  fontSize200: '14px',
  fontSize300: '16px',
  fontSize400: '18px',
  fontSize550: '20px',
  fontSize650: '24px',
  fontSize750: '28px',
  fontSize850: '32px',
  fontSize950: '36px',
  fontSize1050: '40px',
  fontSize1250: '44px',
  fontSize1350: '52px',
  fontSize1450: '96px',
});

// Font weights
export const fontWeights = stylex.defineVars({
  fontWeightNormal: 'normal',
  fontWeight500: '500',
  fontWeight700: '700',
});

// Line heights
export const lineHeights = stylex.defineVars({
  lineHeight100: '20px',
  lineHeight150: '16px',
  lineHeight200: '20px',
  lineHeight250: '16px',
  lineHeight300: '24px',
  lineHeight350: '20px',
  lineHeight400: '28px',
  lineHeight450: '24px',
  lineHeight550: '28px',
  lineHeight650: '32px',
  lineHeight750: '36px',
  lineHeight850: '40px',
  lineHeight950: '44px',
  lineHeight1050: '52px',
  lineHeight1250: '52px',
  lineHeight1350: '64px',
  lineHeight1450: '112px',
});
