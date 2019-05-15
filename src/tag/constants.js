/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TagKindT} from './types.js';

// Remove this in the next major version
export const COLOR_STYLE_KEYS = {
  neutral: 'tagNeutralBackground',
  primary: 'tagPrimaryBackground',
  positive: 'tagPositiveBackground',
  warning: 'tagWarningBackground',
  negative: 'tagNegativeBackground',
};

export const VARIANT = Object.freeze({
  solid: 'solid',
  light: 'light',
  outlined: 'outlined',
});

export const KIND: {[TagKindT]: string} = Object.keys({
  ...COLOR_STYLE_KEYS,
  custom: null,
}).reduce((kindMap, key) => {
  kindMap[key] = key;
  return kindMap;
}, {});
