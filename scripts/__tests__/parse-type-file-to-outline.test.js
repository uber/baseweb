/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

const {parseFileToOutline} = require('../cheat-sheet-generator.js');

describe('parse-type-file-to-outline', () => {
  it('simple type', () => {
    const source = `
      // @flow
      export type FirstT = number;
    `;
    const output = parseFileToOutline(source);
    expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "children": Array [],
    "lineStart": 3,
    "name": "FirstT",
  },
]
`);
  });

  it('single type', () => {
    const source = `
      // @flow
      export type PropsT = {
        a: string,
        b: number,
      };
    `;
    const output = parseFileToOutline(source);
    expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "children": Array [
      Object {
        "lineStart": 4,
        "name": "a",
      },
      Object {
        "lineStart": 5,
        "name": "b",
      },
    ],
    "lineStart": 3,
    "name": "PropsT",
  },
]
`);
  });

  it('multiple types', () => {
    const source = `
      // @flow
      export type FirstT = {
        a: string,
        b: number,
      };

      export type SecondT = {
        a: string,
        b: number,
      };
    `;
    const output = parseFileToOutline(source);
    expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "children": Array [
      Object {
        "lineStart": 4,
        "name": "a",
      },
      Object {
        "lineStart": 5,
        "name": "b",
      },
    ],
    "lineStart": 3,
    "name": "FirstT",
  },
  Object {
    "children": Array [
      Object {
        "lineStart": 9,
        "name": "a",
      },
      Object {
        "lineStart": 10,
        "name": "b",
      },
    ],
    "lineStart": 8,
    "name": "SecondT",
  },
]
`);
  });

  it('only includes exported types', () => {
    const source = `
      // @flow
      export type FirstT = {
        a: string,
        b: number,
      };

      type SecondT = {
        a: string,
        b: number,
      };
    `;
    const output = parseFileToOutline(source);
    expect(output).toMatchInlineSnapshot(`
Array [
  Object {
    "children": Array [
      Object {
        "lineStart": 4,
        "name": "a",
      },
      Object {
        "lineStart": 5,
        "name": "b",
      },
    ],
    "lineStart": 3,
    "name": "FirstT",
  },
]
`);
  });
});
