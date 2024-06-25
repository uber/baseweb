/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import defaultFoundationColors from './color-foundation-tokens';
import { fontTokens } from '../shared/typography';
import type { Primitives } from '../types';

// We don't use this ourselves. We provide it for backward compatibility.
// People may have used it to create their own custom theme.
const primitives: Primitives = {
  ...defaultFoundationColors,
  ...fontTokens,
};

export default primitives;
