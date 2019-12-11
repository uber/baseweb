/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {OptionT, ValueT} from '../types.js';

const trim = str => str.replace(/^\s+|\s+$/g, '');

const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isValid = value => {
  return typeof value !== 'undefined' && value !== null && value !== '';
};

type defaultPropsT = {
  filterOption: ?(option: OptionT, filterValue: string) => boolean,
  ignoreCase: boolean,
  labelKey: string,
  matchPos: 'any' | 'start',
  matchProp: 'any' | 'label' | 'value',
  trimFilter: boolean,
  valueKey: string,
};

const defaultProps: defaultPropsT = {
  filterOption: null,
  ignoreCase: true,
  labelKey: 'label',
  matchPos: 'any',
  matchProp: 'any',
  trimFilter: true,
  valueKey: 'value',
};

const filterOptions = (
  options: ValueT,
  filterValue: string,
  excludeOptions: ?ValueT,
  newProps: ?$Shape<defaultPropsT>,
) => {
  const props = {
    ...defaultProps,
    ...newProps,
  };

  if (props.ignoreCase) {
    filterValue = filterValue.toLowerCase();
  }

  if (props.trimFilter) {
    filterValue = trim(filterValue);
  }

  const excludeValues = (excludeOptions || []).reduce((acc, option) => {
    acc.add(option[props.valueKey]);
    return acc;
  }, new Set());

  const re = new RegExp(
    `${props.matchPos === 'start' ? '$' : ''}${escapeRegExp(filterValue)}`,
    props.ignoreCase ? 'i' : '',
  );

  if (Array.isArray(options)) {
    // $FlowFixMe
    return options.filter(option => {
      if (excludeValues.has(option[props.valueKey])) return false;
      if (props.filterOption)
        return props.filterOption.call(undefined, option, filterValue);
      if (!filterValue) return true;

      const value = option[props.valueKey];
      const label = option[props.labelKey];
      const hasValue = isValid(value);
      const hasLabel = isValid(label);

      if (!hasValue && !hasLabel) {
        return false;
      }

      const valueTest = hasValue ? String(value) : null;
      const labelTest = hasLabel ? String(label) : null;

      return (
        (valueTest && props.matchProp !== 'label' && re.test(valueTest)) ||
        (labelTest && props.matchProp !== 'value' && re.test(labelTest))
      );
    });
  } else {
    const optgroups = Object.keys(options);
    return optgroups.reduce((nextOptions, optgroup) => {
      const filteredOptions = options[optgroup].filter(option => {
        if (excludeValues.has(option[props.valueKey])) return false;
        if (props.filterOption)
          return props.filterOption.call(undefined, option, filterValue);
        if (!filterValue) return true;

        const value = option[props.valueKey];
        const label = option[props.labelKey];
        const hasValue = isValid(value);
        const hasLabel = isValid(label);

        if (!hasValue && !hasLabel) {
          return false;
        }

        const valueTest = hasValue ? String(value) : null;
        const labelTest = hasLabel ? String(label) : null;

        return (
          (valueTest && props.matchProp !== 'label' && re.test(valueTest)) ||
          (labelTest && props.matchProp !== 'value' && re.test(labelTest))
        );
      });
      if (filteredOptions.length) {
        nextOptions[optgroup] = filteredOptions;
      }
      return nextOptions;
    }, {});
  }
};

export default filterOptions;
