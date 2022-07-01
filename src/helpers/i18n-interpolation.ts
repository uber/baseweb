/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// Example:
// getInterpolatedString('Selected date is ${date}', 'Jan 1, 2020') => 'Selected date is Jan 1, 2020'
export default function getInterpolatedString(
  translation: string,
  interpolations: {
    [x: string]: string;
  } = {}
): string {
  return translation.replace(/\${(.*?)}/g, (_, k) =>
    interpolations[k] === undefined ? '${' + k + '}' : interpolations[k]
  );
}
