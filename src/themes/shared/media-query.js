/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {getMediaQuery} from '../../helpers/responsive-helpers.js';
import breakpoints from './breakpoints.js';
import type {MediaQueryT} from '../types.js';

const mediaQuery: MediaQueryT = {
  small: getMediaQuery({'min-width': `${breakpoints.small}px`}),
  medium: getMediaQuery({'min-width': `${breakpoints.medium}px`}),
  large: getMediaQuery({'min-width': `${breakpoints.large}px`}),
};

export default mediaQuery;
