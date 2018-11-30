/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {ButtonPropsT} from './types.js';

export function getSharedProps({
  kind,
  size,
  shape,
  isLoading,
  disabled,
}: ButtonPropsT) {
  return {
    $size: size,
    $kind: kind,
    $shape: shape,
    $isLoading: isLoading,
    $disabled: disabled,
  };
}
