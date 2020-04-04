/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import {defaultFontTokens} from '../shared/typography.js';
import type {PrimitivesT} from '../types.js';

// We provide this for backward compatability even though we
// do not use it for anything. People may have used it to create
// their own themes.
const primitives: PrimitivesT = {
  ...colorTokens,
  ...defaultFontTokens,
};

export default primitives;
