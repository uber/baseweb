/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {PropsT, OptionT, OptionsT, ValueT} from '../types-next.js';

export function normalizeOptions<P>(options: OptionsT<P>): ValueT<P> {
  if (options) {
    if (Array.isArray(options)) {
      return options;
    } else {
      return Object.keys(options).reduce((arr, optgroup) => {
        const optgroupOptions = options[optgroup];
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
  }
  return [];
}

export function expandValue<P>(
  value: OptionT<P>,
  options: OptionsT<P>,
  valueKey: string,
): OptionT<P> {
  if (!options) {
    return value;
  }

  const normalizedOptions = normalizeOptions(options);
  for (let i = 0; i < normalizedOptions.length; i++) {
    if (String(normalizedOptions[i][valueKey]) === String(value[valueKey])) {
      return normalizedOptions[i];
    }
  }
  return value;
}
