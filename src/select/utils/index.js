/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {PropsT, OptionT, OptionsT, OptgroupsT, ValueT} from '../types.js';

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
  options: OptgroupsT,
  valueKey: string,
): OptionT => {
  if (!options) return value;

  const normalizedOptions = normalizeOptions(options);
  for (let i = 0; i < normalizedOptions.length; i++) {
    if (String(normalizedOptions[i][valueKey]) === String(value[valueKey])) {
      return normalizedOptions[i];
    }
  }
  return value;
};
