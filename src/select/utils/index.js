/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export const stringifyValue = value =>
  typeof value === 'string'
    ? value
    : (value !== null && JSON.stringify(value)) || '';

export const shouldShowValue = (state, props) => {
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

export const shouldShowPlaceholder = (state, props, isOpen) => {
  const {inputValue, isPseudoFocused, isFocused} = state;
  const {onSelectResetsInput} = props;

  return (
    !inputValue ||
    (!onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused)
  );
};

export const expandValue = (value, props) => {
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
    if (String(options[i][valueKey]) === String(value)) return options[i];
  }
};
