/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {OptionT, ValueT} from '../types.js';

const trim = str => str.replace(/^\s+|\s+$/g, '');

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
  newProps: $Shape<defaultPropsT> | typeof undefined,
) => {
  let internalExcludeOptions = excludeOptions;

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

  if (excludeOptions)
    internalExcludeOptions = excludeOptions.map(i => i[props.valueKey]);

  // $FlowFixMe
  return options.filter(option => {
    if (
      internalExcludeOptions &&
      internalExcludeOptions.indexOf(option[props.valueKey]) > -1
    )
      return false;
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

    let valueTest = hasValue ? String(value) : null;
    let labelTest = hasLabel ? String(label) : null;

    if (props.ignoreCase) {
      valueTest = valueTest ? valueTest.toLowerCase() : valueTest;
      labelTest = labelTest ? labelTest.toLowerCase() : labelTest;
    }

    return props.matchPos === 'start'
      ? (valueTest &&
          props.matchProp !== 'label' &&
          valueTest.substr(0, filterValue.length) === filterValue) ||
          (labelTest &&
            props.matchProp !== 'value' &&
            labelTest.substr(0, filterValue.length) === filterValue)
      : (valueTest &&
          props.matchProp !== 'label' &&
          valueTest.indexOf(filterValue) >= 0) ||
          (labelTest &&
            props.matchProp !== 'value' &&
            labelTest.indexOf(filterValue) >= 0);
  });
};

export default filterOptions;
