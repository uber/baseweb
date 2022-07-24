/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled } from '../styles/index.js';
import { SIZE, type SizeT } from '../input/index.js';

export const IconWrapper = styled<{ $size: SizeT }>('div', (props) => {
  const { $size, $theme } = props;
  const margin = {
    [SIZE.mini]: $theme.sizing.scale300,
    [SIZE.compact]: $theme.sizing.scale500,
    [SIZE.default]: $theme.sizing.scale600,
    [SIZE.large]: $theme.sizing.scale700,
  };
  return {
    [(($theme.direction === 'rtl' ? 'marginRight' : 'marginLeft'): string)]: margin[$size],
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  };
});
