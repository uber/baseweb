/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// Clamp a number between a min and max
export function clamp(num: number, minNum: number, maxNum: number) {
  return Math.min(Math.max(num, minNum), maxNum);
}
