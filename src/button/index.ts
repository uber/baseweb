/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { CustomColors } from './types';

export { default as Button } from './button';
// Constants
export { KIND, SIZE, SHAPE, MIN_HIT_AREA } from './constants';
// Styled elements
export {
  BaseButton as StyledBaseButton,
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer,
} from './styled-components';
// Types
export * from './types';

/** @deprecated use CustomColors instead. To be removed in future versions.*/
export type CustomColorsT = CustomColors;
