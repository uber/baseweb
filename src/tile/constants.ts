/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const TILE_KIND = {
  selection: 'selection',
  action: 'action',
} as const;

export const ALIGNMENT = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;

export const TILE_GROUP_KIND = {
  singleSelect: 'singleSelect',
  multiSelectBatch: 'multiSelectBatch',
  multiSelectLive: 'multiSelectLive',
  none: 'none',
} as const;

export const ARTWORK_SIZES = {
  medium: 'medium',
  large: 'large',
} as const;
