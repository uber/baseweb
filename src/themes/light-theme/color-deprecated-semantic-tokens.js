/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import type {ColorTokensT, DeprecatedSemanticColorTokensT} from '../types.js';

/* ---- DEPRECATED ---- */
export default (
  themePrimitives: ColorTokensT = colorTokens,
): DeprecatedSemanticColorTokensT => ({
  // TODO(#2318) Remove Legacy Semantic Colors values in the next v10 major
  // since it's not used in the component specific tokens
  // and we ship semantic tokens separately

  /* ---- Legacy Semantic Colors ---- */

  // Font Color
  colorPrimary: themePrimitives.black,
  colorSecondary: themePrimitives.mono800,
  // Background
  background: themePrimitives.white,
  backgroundAlt: themePrimitives.white,
  backgroundInv: themePrimitives.primary,
  // Foreground
  foreground: themePrimitives.black,
  foregroundAlt: themePrimitives.mono800,
  foregroundInv: themePrimitives.white,
  // Borders
  border: themePrimitives.mono500,
  borderAlt: themePrimitives.mono600,
  borderFocus: themePrimitives.primary,
  borderError: themePrimitives.negative,
  // Shadow
  shadowFocus: 'rgba(39, 110, 241, 0.32)',
  shadowError: 'rgba(229, 73, 55, 0.32)',
});
