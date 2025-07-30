/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { SelectProps, Option, Options, Optgroups, Value } from '../types';

export function groupedOptionsToArray(groupedOptions: Optgroups): Value {
  return Object.keys(groupedOptions).reduce((arr, optgroup) => {
    const optgroupOptions = groupedOptions[optgroup];
    return arr.concat(
      // @ts-ignore
      optgroupOptions.map((option) => {
        return {
          ...option,
          __optgroup: optgroup,
        };
      })
    );
  }, []);
}

export function normalizeOptions(options: Options): Value {
  if (options) {
    if (Array.isArray(options)) {
      return options;
    } else {
      return groupedOptionsToArray(options as Optgroups);
    }
  }

  return [];
}

export const expandValue = (value: Option, props: Partial<SelectProps>): Option => {
  if (!props.options) return value;

  const normalizedOptions = normalizeOptions(props.options);
  for (let i = 0; i < normalizedOptions.length; i++) {
    // @ts-ignore
    if (String(normalizedOptions[i][props.valueKey]) === String(value[props.valueKey])) {
      return normalizedOptions[i];
    }
  }
  return value;
};
