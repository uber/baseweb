/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE, type Size } from '../input';

export const IconWrapper = styled<
  'div',
  {
    $size: Size;
  }
>('div', (props) => {
  const { $size, $theme } = props;
  const margin: { [k in keyof typeof SIZE]: string } = {
    [SIZE.mini]: $theme.sizing.scale300,
    [SIZE.compact]: $theme.sizing.scale500,
    [SIZE.default]: $theme.sizing.scale600,
    [SIZE.large]: $theme.sizing.scale700,
  };
  return {
    [$theme.direction === 'rtl' ? 'marginRight' : ('marginLeft' as string)]: margin[$size],
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  };
});
IconWrapper.displayName = 'IconWrapper';
