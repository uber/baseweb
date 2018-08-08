/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow

/**
 * Given a real theme, creates a mock theme object where the values are
 * just strings representing the theme value. These mock objects are
 * intended to be used in unit tests so that changes to the theme values
 * do not break unit tests.
 *
 * Example input:
 * {
 *   borders: {
 *     useRoundedCorners: true,
 *     radius100: '2px',
 *     radius200: '4px',
 *     radius300: '8px',
 *   },
 *   animation: {
 *     timing100: '0.25s',
 *     timing400: '0.4s',
 *   }
 * }
 *
 * Example output:
 * {
 *   borders: {
 *     useRoundedCorners: '$theme.borders.useRoundedCorners',
 *     radius100: '$theme.borders.radius100',
 *     radius200: '$theme.borders.radius200',
 *     radius300: '$theme.borders.radius300',
 *   },
 *   animation: {
 *     timing100: '$theme.animation.timing100',
 *     timing400: '$theme.animation.timing400',
 *   }
 * }
 */
export default function createMockTheme(base: {}, prefix: string = '$theme') {
  const mock = {};

  Object.keys(base).forEach(key => {
    const path = `${prefix}.${key}`;
    if (typeof base[key] === 'object') {
      mock[key] = createMockTheme(base[key], path);
    } else {
      mock[key] = path;
    }
  });

  return mock;
}
