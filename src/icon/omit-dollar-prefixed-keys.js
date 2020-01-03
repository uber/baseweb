/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

// eslint-disable-next-line flowtype/no-weak-types
export default function omitDollarPrefixedKeys(source: {[string]: any}) {
  const result = {};

  for (const key in source) {
    if (key[0] !== '$') {
      result[key] = source[key];
    }
  }

  return result;
}
