/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { InputPropsT, BaseInputPropsT, InternalStateT, SharedPropsT } from './types';

export function getSharedProps<T>(
  props: BaseInputPropsT<T> | InputPropsT,
  state: InternalStateT
): Partial<SharedPropsT> {
  const { disabled, error, positive, adjoined, size, required, readOnly } = props;
  const { isFocused } = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $adjoined: adjoined,
    $size: size,
    $required: required,
    $isReadOnly: readOnly,
  };
}
