/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import sharedBorders from '../shared/borders.js';
import deepMerge from '../../utils/deep-merge.js';
import type {BordersT} from '../types.js';

// Override border colors for the dark theme
const borders: BordersT = deepMerge({}, sharedBorders, {
  border100: {
    borderColor: 'hsla(0, 0%, 100%, 0.04)',
  },
  border200: {
    borderColor: 'hsla(0, 0%, 100%, 0.08)',
  },
  border300: {
    borderColor: 'hsla(0, 0%, 100%, 0.12)',
  },
  border400: {
    borderColor: 'hsla(0, 0%, 100%, 0.16)',
  },
  border500: {
    borderColor: 'hsla(0, 0%, 100%, 0.2)',
  },
  border600: {
    borderColor: 'hsla(0, 0%, 100%, 0.24)',
  },
});

export default borders;
