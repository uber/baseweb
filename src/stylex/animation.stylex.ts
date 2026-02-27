/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as stylex from '@stylexjs/stylex';

/**
 * Animation Tokens
 */
export const animationTimings = stylex.defineVars({
  timing0: '0',
  timing100: '100ms',
  timing150: '150ms',
  timing200: '200ms',
  timing250: '250ms',
  timing300: '300ms',
  timing400: '400ms',
  timing500: '500ms',
  timing600: '600ms',
  timing700: '700ms',
  timing800: '800ms',
  timing900: '900ms',
  timing1000: '1000ms',
  timing1500: '1500ms',
  timing3000: '3000ms',
  timing5000: '5000ms',
  timing7000: '7000ms',
});

export const animationCurves = stylex.defineVars({
  easeLinear: 'cubic-bezier(0, 0, 1, 1)',
  linearCurve: 'cubic-bezier(0, 0, 1, 1)',
  easeDecelerate: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOutQuinticCurve: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
  easeAccelerate: 'cubic-bezier(0.64, 0, 0.78, 0)',
  easeInQuinticCurve: 'cubic-bezier(0.64, 0, 0.78, 0)',
  easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
  easeAccelerateDecelerate: 'cubic-bezier(0.83, 0, 0.17, 1)',
  easeInOutQuinticCurve: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeResponsiveAccelerate: 'cubic-bezier(0.11, 0, 0.5, 0)',
});
