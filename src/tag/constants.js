/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TagKindT} from './types';

export const COLOR_STYLE_KEYS = {
  primary: 'primary400',
  warning: 'warning400',
  positive: 'positive400',
  negative: 'negative400',
};

export const KIND: {[TagKindT]: string} = Object.keys({
  ...COLOR_STYLE_KEYS,
  custom: null,
}).reduce((kindMap, key) => {
  kindMap[key] = key;
  return kindMap;
}, {});
