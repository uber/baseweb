/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { getMediaQuery } from '../../helpers/responsive-helpers';
import breakpoints from './breakpoints';
import type { MediaQueryT } from '../types';

const mediaQuery: MediaQueryT = {
  small: getMediaQuery(breakpoints.small),
  medium: getMediaQuery(breakpoints.medium),
  large: getMediaQuery(breakpoints.large),
};

export default mediaQuery;
