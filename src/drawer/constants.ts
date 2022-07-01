/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { AnchorT, AnchorPropT, SizeT, SizePropT } from './types';

export const SIZE: {
  [key in SizeT]: SizePropT;
} = {
  default: 'default',
  full: 'full',
  auto: 'auto',
};

export const SIZE_DIMENSION = {
  default: '500px',
  full: '100%',
  auto: 'auto',
};

export const CLOSE_SOURCE = {
  closeButton: 'closeButton',
  backdrop: 'backdrop',
  escape: 'escape',
};

export const ANCHOR: {
  [key in AnchorT]: AnchorPropT;
} = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
};
