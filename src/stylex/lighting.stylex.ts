/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as stylex from '@stylexjs/stylex';

/**
 * Lighting/Shadow Tokens
 */
export const shadows = stylex.defineVars({
  shadow100: '0 1px 4px rgba(0, 0, 0, 0.16)',
  shadow400: '0 2px 8px rgba(0, 0, 0, 0.16)',
  shadow600: '0 4px 16px rgba(0, 0, 0, 0.16)',
  shadow700: '0 8px 24px rgba(0, 0, 0, 0.16)',
  shadow800: '0 12px 32px rgba(0, 0, 0, 0.16)',
  shadowCard: '0 1px 4px rgba(0, 0, 0, 0.16)',
  shadowCardHover: '0 4px 8px rgba(0, 0, 0, 0.12)',
  shadowOverlayDark: '0 0 8px 0 rgba(0, 0, 0, 0.24)',
  shadowOverlayLight: '0 0 8px 0 rgba(0, 0, 0, 0.12)',
});

export const overlays = stylex.defineVars({
  overlay0: '0',
  overlay100: '100',
  overlay200: '200',
  overlay300: '300',
  overlay400: '400',
  overlay500: '500',
  overlay600: '600',
});
