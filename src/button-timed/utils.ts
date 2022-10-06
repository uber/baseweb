/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
function roundUpToNearestInt(num: number) {
  const cleanedNum = Math.trunc(num * 10) / 10;
  return Math.ceil(cleanedNum);
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const formatTime = (totalMilliseconds: number) => {
  const totalSeconds = totalMilliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = roundUpToNearestInt(totalSeconds % 60);
  return `${minutes}:${padTo2Digits(seconds)}`;
};
