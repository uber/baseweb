/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import deepMerge from '../../utils/deep-merge';
import { getFoundationColorOverrides } from '../utils';
import { primitiveColors } from '../../tokens';
import getComponentColors from './color-component-tokens';
import getSemanticColors from './color-semantic-tokens';
import defaultFoundationColors from './color-foundation-tokens';
import { LightTheme } from './light-theme';

import type { DeepPartial, MakeExtendable, Theme } from '../../styles/types';

export default function createLightTheme<
  OverridesT extends DeepPartial<MakeExtendable<Theme>> = {}
>(overrides?: OverridesT): Theme & OverridesT {
  const foundationColors = {
    ...defaultFoundationColors,
    ...getFoundationColorOverrides(overrides?.colors),
  };
  const semanticColors = getSemanticColors(foundationColors);
  const componentColors = getComponentColors(semanticColors);

  const theme = {
    ...structuredClone(LightTheme),
    colors: {
      ...primitiveColors,
      ...foundationColors,
      ...semanticColors,
      ...componentColors,
    },
  };

  return deepMerge(theme, overrides);
}
