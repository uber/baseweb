/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ColorTokens } from '../styles/types';

const foundationColors = [
  'primaryA',
  'primaryB',
  'primary',
  'accent',
  'negative',
  'warning',
  'positive',
];

export function getFoundationColorOverrides(colors?: Partial<ColorTokens>) {
  if (!colors) return {};

  return foundationColors.reduce((acc, key) => {
    if (colors[key]) {
      acc[key] = colors[key];
    }
    return acc;
  }, {});
}
