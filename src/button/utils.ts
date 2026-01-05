/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { BaseButtonProps, SharedStyleProps } from './types';

export function getSharedProps({
  colors,
  disabled,
  minHitArea,
  isLoading,
  isSelected,
  kind,
  shape,
  size,
  backgroundSafe,
  widthType,
}: BaseButtonProps): Partial<SharedStyleProps> {
  return {
    $colors: colors,
    $disabled: disabled,
    $minHitArea: minHitArea,
    $isLoading: isLoading,
    $isSelected: Boolean(isSelected),
    $kind: kind,
    $shape: shape,
    $size: size,
    $backgroundSafe: backgroundSafe,
    $widthType: widthType,
  };
}
