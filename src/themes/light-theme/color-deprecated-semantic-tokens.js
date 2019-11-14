/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import type {ColorTokensT, DeprecatedSemanticColorTokensT} from '../types.js';

/* ---- DEPRECATED ---- */
export default (
  primitives: ColorTokensT = colorTokens,
): DeprecatedSemanticColorTokensT => ({
  // TODO(#2318) Remove Legacy Semantic Colors values in the next major
  // since it's not used in the component specific tokens
  // and we ship semantic tokens separately

  /* ---- Legacy Semantic Colors ---- */

  // Font Color
  colorPrimary: primitives.black,
  colorSecondary: primitives.mono800,
  // Background
  background: primitives.white,
  backgroundAlt: primitives.white,
  backgroundInv: primitives.primary,
  // Foreground
  foreground: primitives.black,
  foregroundAlt: primitives.mono800,
  foregroundInv: primitives.white,
  // Borders
  border: primitives.mono500,
  borderAlt: primitives.mono600,
  borderFocus: primitives.primary,
  borderError: primitives.negative,
  // Shadow
  shadowFocus: 'rgba(39, 110, 241, 0.32)',
  shadowError: 'rgba(229, 73, 55, 0.32)',
});
