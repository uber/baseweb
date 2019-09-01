/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';
import { SHAPE } from '../button/index';

export const StyledRoot = styled<
  'div',
  {
    $shape: string;
    $length: number;
  }
>('div', ({ $shape, $length, $theme }) => {
  const margin =
    $length === 1 ? undefined : $shape !== SHAPE.default ? `-${$theme.sizing.scale100}` : '-0.5px';
  return {
    display: 'flex',
    marginLeft: margin,
    marginRight: margin,
  };
});
