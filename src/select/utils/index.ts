/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { PropsT, OptionT, OptionsT, OptgroupsT, ValueT } from '../types';

function groupedOptionsToArray(groupedOptions: OptgroupsT): ValueT {
  return Object.keys(groupedOptions).reduce((arr, optgroup) => {
    const optgroupOptions = groupedOptions[optgroup];
    return arr.concat(
      optgroupOptions.map((option) => {
        return {
          ...option,
          __optgroup: optgroup,
        };
      })
    );
  }, []);
}

export function normalizeOptions(options: OptionsT): ValueT {
  if (options) {
    if (Array.isArray(options)) {
      return options;
    } else {
      return groupedOptionsToArray(options as OptgroupsT);
    }
  }

  return [];
}

export const expandValue = (value: OptionT, props: Partial<PropsT>): OptionT => {
  if (!props.options) return value;

  const normalizedOptions = normalizeOptions(props.options);
  for (let i = 0; i < normalizedOptions.length; i++) {
    if (String(normalizedOptions[i][props.valueKey]) === String(value[props.valueKey])) {
      return normalizedOptions[i];
    }
  }
  return value;
};
