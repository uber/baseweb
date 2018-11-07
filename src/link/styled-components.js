/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index';

export const Link = styled('a', ({$theme}) => {
  const {colors, typography} = $theme;
  return {
    color: colors.primary400,
    ...typography.font450,
    textDecoration: 'none',
  };
});
