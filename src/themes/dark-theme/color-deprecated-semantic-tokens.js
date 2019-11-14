/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import type {ColorTokensT} from '../types.js';

/* ---- DEPRECATED ---- */
export default (primitives: ColorTokensT = colorTokens) => ({
  // TODO(#2318) Remove Legacy Semantic Colors values in the next major
  // since it's not used in the component specific tokens
  // and we ship semantic tokens separately

  /* ---- Legacy Semantic Colors ---- */

  // Font Color
  colorPrimary: primitives.mono100,
  colorSecondary: primitives.mono200,
  // Background
  background: primitives.mono1000,
  backgroundAlt: primitives.mono700,
  backgroundInv: primitives.mono100,
  // Foreground
  foreground: primitives.mono100,
  foregroundAlt: primitives.mono300,
  foregroundInv: primitives.mono1000,
  // Borders
  border: primitives.mono600,
  borderAlt: primitives.mono700,
  borderFocus: primitives.primary,
  borderError: primitives.negative,
  // Shadow
  shadowFocus: 'rgba(39, 110, 241, 0.32)',
  shadowError: 'rgba(229, 73, 55, 0.32)',
});
