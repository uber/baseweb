/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {AnimationT} from '../types.js';

const animation: AnimationT = {
  timing100: '100ms',
  timing200: '200ms',
  timing300: '300ms',
  timing400: '400ms',
  timing500: '500ms',
  timing600: '600ms',
  timing700: '700ms',
  timing800: '800ms',
  timing900: '900ms',
  timing1000: '1000ms',
  easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
  easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
  easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInQuinticCurve: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeOutQuinticCurve: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutQuinticCurve: 'cubic-bezier(0.86, 0, 0.07, 1)',
  linearCurve: 'cubic-bezier(0, 0, 1, 1)',
};

export default animation;
