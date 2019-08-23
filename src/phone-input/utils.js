/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// country code regex
const ISO_REGEX = /^[a-z]{2}$/i;
// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127397;
// convert country code to corresponding emoji flag
export function iso2FlagEmoji(iso: string) {
  if (__DEV__) {
    if (!ISO_REGEX.test(iso)) {
      const type = typeof iso;
      throw new TypeError(
        `iso argument must be an ISO 3166-1 alpha-2 string, but got '${
          type === 'string' ? iso : type
        }' instead.`,
      );
    }
  }
  return String.fromCodePoint(
    ...[...iso.toUpperCase()].map(char => char.charCodeAt(0) + OFFSET),
  );
}
