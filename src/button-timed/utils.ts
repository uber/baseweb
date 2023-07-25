/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const formatTime = (totalMilliseconds: number) => {
  let totalSeconds = Math.floor(totalMilliseconds / 1000);

  // If there are remaining milliseconds, consider it as an extra second.
  if (totalMilliseconds % 1000 > 0) {
    totalSeconds += 1;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${padTo2Digits(seconds)}`;
};
