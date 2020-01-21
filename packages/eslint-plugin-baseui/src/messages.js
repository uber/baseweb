/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

module.exports = {
  replace: {
    id: 'replace',
    message: `"{{ old }}" is deprecated and can be replaced with "{{ new }}".`,
  },
  deprecateThemeProperty: {
    id: 'deprecateThemeProperty',
    message: `The theme property, "{{ old }}", is deprecated.`,
  },
  replaceThemeProperty: {
    id: 'replaceThemeProperty',
    message: `The theme property, "{{ old }}", is deprecated and can be replaced with "{{ new }}".`,
  },
};
