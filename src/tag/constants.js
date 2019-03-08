/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TagKindT} from './types.js';

export const COLOR_STYLE_KEYS = {
  neutral: 'tagNeutralBackground',
  primary: 'tagPrimaryBackground',
  positive: 'tagPositiveBackground',
  warning: 'tagWarningBackground',
  negative: 'tagNegativeBackground',
};

export const VARIANT = Object.freeze({
  light: 'light',
  outlined: 'outlined',
  solid: 'solid',
});

export const KIND: {[TagKindT]: string} = Object.keys({
  ...COLOR_STYLE_KEYS,
  custom: null,
}).reduce((kindMap, key) => {
  kindMap[key] = key;
  return kindMap;
}, {});
