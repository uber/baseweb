/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { PrimitiveColors, PrimitiveLightColors, PrimitiveDarkColors } from './types';
import { primitiveColorTokens } from '@uber/base-specs';
const primitiveColors: PrimitiveColors = {
  ...primitiveColorTokens,
  /** @deprecated use gray color tokens instead */
  platinum50: '#F4FAFB',
  /** @deprecated use gray color tokens instead */
  platinum100: '#EBF5F7',
  /** @deprecated use gray color tokens instead */
  platinum200: '#CCDFE5',
  /** @deprecated use gray color tokens instead */
  platinum300: '#A1BDCA',
  /** @deprecated use gray color tokens instead */
  platinum400: '#8EA3AD',
  /** @deprecated use gray color tokens instead */
  platinum500: '#6C7C83',
  /** @deprecated use gray color tokens instead */
  platinum600: '#556268',
  /** @deprecated use gray color tokens instead */
  platinum700: '#394145',
  /** @deprecated use gray color tokens instead */
  platinum800: '#142328',

  /* @deprecated use blue color tokens instead */
  cobalt50: '#EBEDFA',
  /* @deprecated use blue color tokens instead */
  cobalt100: '#D2D7F0',
  /* @deprecated use blue color tokens instead */
  cobalt200: '#949CE3',
  /* @deprecated use blue color tokens instead */
  cobalt300: '#535FCF',
  /* @deprecated use blue color tokens instead */
  cobalt400: '#0E1FC1',
  /* @deprecated use blue color tokens instead */
  cobalt500: '#0A1899',
  /* @deprecated use blue color tokens instead */
  cobalt600: '#081270',
  /* @deprecated use blue color tokens instead */
  cobalt700: '#050C4D',

  /* @deprecated use orange color tokens instead */
  brown50: '#F6F0EA',
  /* @deprecated use orange color tokens instead */
  brown100: '#EBE0DB',
  /* @deprecated use orange color tokens instead */
  brown200: '#D2BBB0',
  /* @deprecated use orange color tokens instead */
  brown300: '#B18977',
  /* @deprecated use orange color tokens instead */
  brown400: '#99644C',
  /* @deprecated use orange color tokens instead */
  brown500: '#744C3A',
  /* @deprecated use orange color tokens instead */
  brown600: '#5C3C2E',
  /* @deprecated use orange color tokens instead */
  brown700: '#3D281E',
};

const primitiveLightColors = {} as PrimitiveLightColors;
const primitiveDarkColors = {} as PrimitiveDarkColors;

for (const key in primitiveColors) {
  if (key.endsWith('Dark')) {
    primitiveDarkColors[key] = primitiveColors[key];
  } else if (key === 'white' || key === 'black') {
    primitiveLightColors[key] = primitiveColors[key];
    primitiveDarkColors[key] = primitiveColors[key];
  } else {
    primitiveLightColors[key] = primitiveColors[key];
  }
}

export { primitiveColors as default, primitiveLightColors, primitiveDarkColors };
