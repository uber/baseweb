/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { LightingT } from '../types';

const lighting: LightingT = {
  shadow400: '0 1px 4px hsla(0, 0%, 0%, 0.16)',
  shadow500: '0 2px 8px hsla(0, 0%, 0%, 0.16)',
  shadow600: '0 4px 16px hsla(0, 0%, 0%, 0.16)',
  shadow700: '0 8px 24px hsla(0, 0%, 0%, 0.16)',
  overlay0: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0)',
  overlay100: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.04)',
  overlay200: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.08)',
  overlay300: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.12)',
  overlay400: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.16)',
  overlay500: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.2)',
  overlay600: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.24)',
  shallowAbove: '0px -4px 16px rgba(0, 0, 0, 0.12)',
  shallowBelow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
  deepAbove: '0px -16px 48px rgba(0, 0, 0, 0.22)',
  deepBelow: '0px 16px 48px rgba(0, 0, 0, 0.22)',
};

export default lighting;
