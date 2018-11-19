/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {PropsT, SelectStateT} from '../types';

export const shouldShowValue = (state: SelectStateT, props: $Shape<PropsT>) => {
  const {inputValue, isPseudoFocused, isFocused} = state;
  const {onSelectResetsInput} = props;
  if (!inputValue) return true;
  if (!onSelectResetsInput) {
    return !(
      (!isFocused && isPseudoFocused) ||
      (isFocused && !isPseudoFocused)
    );
  }
  return false;
};

export const shouldShowPlaceholder = (
  state: SelectStateT,
  props: $Shape<PropsT>,
  isOpen: boolean,
) => {
  const {inputValue, isPseudoFocused, isFocused} = state;
  const {onSelectResetsInput} = props;

  return (
    !inputValue ||
    (!onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused)
  );
};

export const expandValue = (
  // eslint-disable-next-line flowtype/no-weak-types
  value: string | number | boolean | {[string]: any},
  props: $Shape<PropsT>,
) => {
  const valueType = typeof value;
  if (
    valueType !== 'string' &&
    valueType !== 'number' &&
    valueType !== 'boolean'
  )
    return value;
  let {options, valueKey} = props;
  if (!options) return;
  for (let i = 0; i < options.length; i++) {
    if (String(options[i][valueKey]) === String(value)) {
      return options[i];
    }
  }
};
