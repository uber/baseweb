/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {
  PropsT,
  OptionT,
  OptionsT,
  OptgroupsT,
  ValueT,
  SelectStateT,
} from '../types.js';

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

function groupedOptionsToArray(groupedOptions: OptgroupsT): ValueT {
  return Object.keys(groupedOptions).reduce((arr, optgroup) => {
    const optgroupOptions = groupedOptions[optgroup];
    return arr.concat(
      optgroupOptions.map(option => {
        return {
          ...option,
          __optgroup: optgroup,
        };
      }),
    );
  }, []);
}

export function normalizeOptions(options: OptionsT): ValueT {
  if (options) {
    if (Array.isArray(options)) {
      return options;
    } else {
      return groupedOptionsToArray(options);
    }
  }

  return [];
}

export const expandValue = (
  // eslint-disable-next-line flowtype/no-weak-types
  value: OptionT,
  props: $Shape<PropsT>,
): OptionT => {
  if (!props.options) return value;

  const normalizedOptions = normalizeOptions(props.options);
  for (let i = 0; i < normalizedOptions.length; i++) {
    if (
      String(normalizedOptions[i][props.valueKey]) ===
      String(value[props.valueKey])
    ) {
      return normalizedOptions[i];
    }
  }
  return value;
};
