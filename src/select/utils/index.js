/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {PropsT, OptionT, SelectStateT} from '../types.js';

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
  value: OptionT,
  props: $Shape<PropsT>,
): OptionT => {
  let {options, valueKey} = props;
  if (!options) return value;

  if (Array.isArray(options)) {
    for (let i = 0; i < options.length; i++) {
      if (String(options[i][valueKey]) === String(value[valueKey])) {
        return options[i];
      }
    }
  } else {
    const optgroups = Object.keys(options);
    for (let i = 0; i < optgroups.length; i++) {
      const optgroupOptions = optgroups[i];
      for (let j = 0; j < optgroupOptions.length; j++) {
        // $FlowFixMe already ensured that this is an option type
        const option = (options[optgroupOptions[j]]: OptionT);
        if (String(option[valueKey]) === String(value[valueKey])) {
          return option;
        }
      }
    }
  }
  return value;
};
