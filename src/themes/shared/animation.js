/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {AnimationT} from '../types.js';

const animation: AnimationT = {
  timing100: '0.25s',
  timing400: '0.4s',
  timing700: '0.6s',
  timing1000: '1s',
  easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
  easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
  easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export default animation;
