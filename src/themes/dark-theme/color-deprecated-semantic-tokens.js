/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import type {ColorTokensT} from '../types.js';

/* ---- DEPRECATED ---- */
export default (themePrimitives: ColorTokensT = colorTokens) => ({
  // TODO(#2318) Remove Legacy Semantic Colors values in the next v10 major
  // since it's not used in the component specific tokens
  // and we ship semantic tokens separately

  /* ---- Legacy Semantic Colors ---- */

  // Font Color
  colorPrimary: themePrimitives.mono100,
  colorSecondary: themePrimitives.mono200,
  // Background
  background: themePrimitives.mono1000,
  backgroundAlt: themePrimitives.mono700,
  backgroundInv: themePrimitives.mono100,
  // Foreground
  foreground: themePrimitives.mono100,
  foregroundAlt: themePrimitives.mono300,
  foregroundInv: themePrimitives.mono1000,
  // Borders
  border: themePrimitives.mono600,
  borderAlt: themePrimitives.mono700,
  borderFocus: themePrimitives.primary,
  borderError: themePrimitives.negative,
  // Shadow
  shadowFocus: 'rgba(39, 110, 241, 0.32)',
  shadowError: 'rgba(229, 73, 55, 0.32)',
});
