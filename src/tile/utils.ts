/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export function shouldRenderHeaderContainer(leadingContent, trailingContent) {
  if (leadingContent || trailingContent) return true;
  return false;
}

export function isIndexSelected(selected: number | Array<number> | undefined, index: number) {
  if (!Array.isArray(selected) && typeof selected !== 'number') {
    return false;
  }

  if (Array.isArray(selected)) {
    return selected.includes(index);
  }

  return selected === index;
}
