/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Theme } from '../styles';

export const FILE_STATUS = {
  added: 'added',
  error: 'error',
  processed: 'processed',
} as const;

export const FILE_STATUS_TO_COLOR_MAP = (
  $theme: Theme
): { added: string; error: string; processed: string } => ({
  [FILE_STATUS.added]: $theme.colors.accent,
  [FILE_STATUS.error]: $theme.colors.negative,
  [FILE_STATUS.processed]: $theme.colors.positive,
});
