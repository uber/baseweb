/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import {
  getMediaQueries,
  getMediaQuery,
  getMinimumPageMargins,
  getMediaQueryPageMargins,
} from '../responsive-helpers';

describe('Helpers - ResponsiveHelpers', () => {
  test('getMediaQuery', () => {
    expect(getMediaQuery(1280)).toEqual('@media screen and (min-width: 1280px)');
  });

  test('getMediaQueries', () => {
    expect(
      getMediaQueries({
        small: 320,
        medium: 600,
        large: 1280,
      })
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
      })
    ).toMatchObject([
      '@media screen and (min-width: 320px)',
      '@media screen and (min-width: 600px)',
      '@media screen and (min-width: 1280px)',
    ]);
  });

  describe('getMediaQueryPageMargins', () => {
    const breakpoints = { medium: 600, large: 1280, small: 320 };
    test('Has a margin for each breakpoint', () => {
      // @ts-expect-error passing minimal grid properties
      expect(getMediaQueryPageMargins({ breakpoints, grid: { margins: [1, 2, 3] } })).toMatchObject(
        {
          '@media screen and (min-width: 320px)': {
            paddingInlineStart: '1px',
            paddingInlineEnd: '1px',
          },
          '@media screen and (min-width: 600px)': {
            paddingInlineStart: '2px',
            paddingInlineEnd: '2px',
          },
          '@media screen and (min-width: 1280px)': {
            paddingInlineStart: '3px',
            paddingInlineEnd: '3px',
          },
        }
      );
    });

    test('Reuses last margin if less margins than breakpoints ', () => {
      // @ts-expect-error passing minimal grid properties
      expect(getMediaQueryPageMargins({ breakpoints, grid: { margins: [1, 2] } })).toMatchObject({
        '@media screen and (min-width: 320px)': {
          paddingInlineStart: '1px',
          paddingInlineEnd: '1px',
        },
        '@media screen and (min-width: 600px)': {
          paddingInlineStart: '2px',
          paddingInlineEnd: '2px',
        },
        '@media screen and (min-width: 1280px)': {
          paddingInlineStart: '2px',
          paddingInlineEnd: '2px',
        },
      });
    });

    test('Does not use every margin if less breakpoints than margins', () => {
      expect(
        // @ts-expect-error passing minimal grid properties
        getMediaQueryPageMargins({ breakpoints, grid: { margins: [1, 2, 3, 4] } })
      ).toMatchObject({
        '@media screen and (min-width: 320px)': {
          paddingInlineStart: '1px',
          paddingInlineEnd: '1px',
        },
        '@media screen and (min-width: 600px)': {
          paddingInlineStart: '2px',
          paddingInlineEnd: '2px',
        },
        '@media screen and (min-width: 1280px)': {
          paddingInlineStart: '3px',
          paddingInlineEnd: '3px',
        },
      });
    });

    test('Handles single-number margin', () => {
      // @ts-expect-error passing minimal grid properties
      expect(getMediaQueryPageMargins({ breakpoints, grid: { margins: 1 } })).toMatchObject({
        '@media screen and (min-width: 320px)': {
          paddingInlineStart: '1px',
          paddingInlineEnd: '1px',
        },
        '@media screen and (min-width: 600px)': {
          paddingInlineStart: '1px',
          paddingInlineEnd: '1px',
        },
        '@media screen and (min-width: 1280px)': {
          paddingInlineStart: '1px',
          paddingInlineEnd: '1px',
        },
      });
    });
  });

  describe('getMinimumPageMargins', () => {
    test('Chooses first margin from list', () => {
      expect(getMinimumPageMargins([3, 1, 2])).toMatchObject({
        paddingInlineStart: '3px',
        paddingInlineEnd: '3px',
      });
    });

    test('Handles single-number margin', () => {
      expect(getMinimumPageMargins(1)).toMatchObject({
        paddingInlineStart: '1px',
        paddingInlineEnd: '1px',
      });
    });
  });
});
