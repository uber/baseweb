/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {SIZE} from '../input/constants.js';
import {
  Input as StyledInputInput,
  Root as StyledInputRoot,
} from '../input/styled-components.js';
import type {SizeT} from '../input/types.js';
import {styled, withStyle} from '../styles/index.js';

export const StyledRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const StyledInputOverrideRoot = withStyle<
  typeof StyledInputRoot,
  {$size: SizeT},
>(StyledInputRoot, ({$size = SIZE.default}) => {
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

export const StyledInputOverrideInput = withStyle(StyledInputInput, {
  textAlign: 'center',
  paddingLeft: '0',
  paddingRight: '0',
});
