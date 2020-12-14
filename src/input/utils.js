/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {InputPropsT, BaseInputPropsT, InternalStateT} from './types.js';

export function getSharedProps<T>(
  props: BaseInputPropsT<T> | InputPropsT,
  state: InternalStateT,
) {
  const {disabled, error, positive, adjoined, size, required} = props;
  const {isFocused} = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $adjoined: adjoined,
    $size: size,
    $required: required,
  };
}
