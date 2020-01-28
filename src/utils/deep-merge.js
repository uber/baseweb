/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-disable flowtype/no-weak-types */
export default function deepMerge(
  target?: ?{},
  ...sources: Array<null | ?{}>
): any {
  target = target || {};
  const len = sources.length;
  let obj;
  let value;
  for (let i = 0; i < len; i++) {
    obj = sources[i] || {};
    for (let key in obj) {
      if (typeof obj[key] !== undefined) {
        value = obj[key];
        if (isCloneable(value)) {
          target[key] = deepMerge(
            target[key] || (Array.isArray(value) && []) || {},
            value,
          );
        } else {
          target[key] = value;
        }
      }
    }
  }
  return target;
}
/* eslint-enable flowtype/no-weak-types */

/* eslint-disable-next-line flowtype/no-weak-types */
function isCloneable(obj: mixed) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}
