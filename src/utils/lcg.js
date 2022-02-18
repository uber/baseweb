/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const mul = 0x19660d;
const inc = 0x3c6ef35f;
const eps = 1 / 0x100000000;

export default function lcg(seed: number): () => number {
  let state = (0 <= seed && seed < 1 ? seed / eps : Math.abs(seed)) | 0;
  return () => ((state = (mul * state + inc) | 0), eps * (state >>> 0));
}
