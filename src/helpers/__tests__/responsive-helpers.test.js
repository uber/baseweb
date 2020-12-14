/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {getMediaQueries, getMediaQuery} from '../responsive-helpers.js';

describe('Helpers - ResponsiveHelpers', () => {
  test('getMediaQuery', () => {
    expect(getMediaQuery(1280)).toEqual(
      '@media screen and (min-width: 1280px)',
    );
  });

  test('getMediaQueries', () => {
    expect(
      getMediaQueries({
        small: 320,
        medium: 600,
        large: 1280,
      }),
    ).toMatchObject([
      '@media screen and (min-width: 320px)',
      '@media screen and (min-width: 600px)',
      '@media screen and (min-width: 1280px)',
    ]);
  });

  test('getMediaQueries stable breakpoint order', () => {
    expect(
      getMediaQueries({
        large: 1280,
        small: 320,
        medium: 600,
      }),
    ).toMatchObject([
      '@media screen and (min-width: 320px)',
      '@media screen and (min-width: 600px)',
      '@media screen and (min-width: 1280px)',
    ]);
  });
});
