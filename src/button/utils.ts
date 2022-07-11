/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ButtonPropsT, SharedStylePropsT } from './types';

export function getSharedProps({
  colors,
  disabled,
  isLoading,
  isSelected,
  kind,
  shape,
  size,
}: ButtonPropsT): Partial<SharedStylePropsT> {
  return {
    $colors: colors,
    $disabled: disabled,
    $isLoading: isLoading,
    $isSelected: isSelected,
    $kind: kind,
    $shape: shape,
    $size: size,
  };
}
