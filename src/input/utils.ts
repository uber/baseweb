/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { InputProps, BaseInputProps, InternalState, SharedProps } from './types';

export function getSharedProps<T>(
  props: BaseInputProps<T> | InputProps,
  state: InternalState
): SharedProps {
  const { disabled, error, positive, adjoined, size, required, resize, readOnly } = props;
  const { isFocused } = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $adjoined: adjoined,
    $size: size,
    $required: required,
    $resize: resize,
    $isReadOnly: readOnly,
  };
}
