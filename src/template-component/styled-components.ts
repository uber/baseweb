/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import type { SharedStyleProps } from './types';

export const Root = styled<'button', SharedStyleProps>('button', (props) => {
  const { $prop, $theme } = props;
  return {
    color: $prop ? $theme.colors.accent : $theme.colors.positive400,
    cursor: 'pointer',
  };
});
Root.displayName = 'Root';
