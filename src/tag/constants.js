/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TagKindT} from './types.js';

export const VARIANT = Object.freeze({
  solid: 'solid',
  light: 'light',
  outlined: 'outlined',
});

export const KIND: {[TagKindT]: string} = [
  'neutral',
  'primary',
  'positive',
  'warning',
  'negative',
  'custom',
].reduce((kindMap, key) => {
  kindMap[key] = key;
  return kindMap;
}, {});
