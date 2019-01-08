/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from 'baseui';

export default styled('a', ({$theme}) => ({
  textDecoration: 'none',
  cursor: 'pointer',
  color: $theme.colors.black,
  ':visited': {
    color: $theme.colors.black,
  },
  ':hover': {
    color: $theme.colors.primary,
  },
}));
