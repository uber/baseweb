/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, withStyle } from '../styles';
import { StyledRoot as StyledInputRoot, StyledInput as StyledInputInput, SIZE } from '../input';
import type { Size } from '../input';

export const StyledRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

StyledRoot.displayName = 'StyledRoot';

export const StyledInputOverrideRoot = withStyle<
  typeof StyledInputRoot,
  {
    $size: Size;
  }
>(StyledInputRoot, ({ $size = SIZE.default }) => {
  const width = {
    [SIZE.mini]: '32px',
    [SIZE.compact]: '36px',
    [SIZE.default]: '48px',
    [SIZE.large]: '56px',
  }[$size];
  return {
    width,
    marginRight: '8px',
  };
});

StyledInputOverrideRoot.displayName = 'StyledInputOverrideRoot';

export const StyledInputOverrideInput = withStyle(StyledInputInput, {
  textAlign: 'center',
  paddingLeft: '0',
  paddingRight: '0',
});
StyledInputOverrideInput.displayName = 'StyledInputOverrideInput';
