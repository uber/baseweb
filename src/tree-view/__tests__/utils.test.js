/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {getPrevId, getParentId, getNextId, getFirstChildId} from '../utils.js';
import type {TreeNodeT} from '../types.js';

const data: TreeNodeT[] = [
  {
    id: 1,
    label: 'Label 1',
    isExpanded: true,
    children: [
      {
        id: 2,
        label: 'Label 2',
        isExpanded: true,
        children: [
          {
            id: 3,
            label: 'Label 3',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'Label 4',
    isExpanded: true,
    children: [
      {
        id: 5,
        label: 'Label 5',
        isExpanded: true,
        children: [
          {
            id: 6,
            label: 'Label 6',
          },
          {
            id: 11,
            label: 'Label 11',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Label 7',
    isExpanded: true,
    children: [
      {
        id: 8,
        label: 'Label 8',
        isExpanded: false,
        children: [
          {
            id: 9,
            label: 'Label 9',
          },
        ],
      },
      {
        id: 10,
        label: 'Label 10',
      },
    ],
  },
];

describe('getPrevId', () => {
  test("sibling's leaf at the root", () => {
    expect(getPrevId(data, 4, null)).toBe(3);
  });
  test('sibling at the second level', () => {
    expect(getPrevId(data, 10, null)).toBe(8);
  });
  test("sibling's last leaf", () => {
    expect(getPrevId(data, 7, null)).toBe(11);
  });
  test('sibling at the root', () => {
    expect(getPrevId(data, 4, null)).toBe(3);
  });
  test('parent at the root', () => {
    expect(getPrevId(data, 1, null)).toBe(null);
  });
  test('parent at the second level', () => {
    expect(getPrevId(data, 5, null)).toBe(4);
  });
  test('for nodeId that is in a non-expanded branch', () => {
    expect(getPrevId(data, 9, null)).toBe(null);
  });
  test('for non-existent nodeId', () => {
    expect(getPrevId(data, 999, null)).toBe(null);
  });
});

describe('getParentId', () => {
  test('root', () => {
    expect(getParentId(data, 1, null)).toBe(null);
  });
  test('deep, direct parent', () => {
    expect(getParentId(data, 3, null)).toBe(2);
  });
  test('deep, skip first sibling', () => {
    expect(getParentId(data, 11, null)).toBe(5);
  });
});

describe('getNextId', () => {
  test('child at the root', () => {
    expect(getNextId(data, 1, null)).toBe(2);
  });
  test('child at the second level', () => {
    expect(getNextId(data, 2, null)).toBe(3);
  });
  test('sibling', () => {
    expect(getNextId(data, 6, null)).toBe(11);
  });
  test('sibling when children are not expanded', () => {
    expect(getNextId(data, 8, null)).toBe(10);
  });
  test('next closest ommer', () => {
    expect(getNextId(data, 11, null)).toBe(7);
  });
  test('root ommer', () => {
    expect(getNextId(data, 10, null)).toBe(null);
  });
  test('for nodeId that is in a non-expanded branch', () => {
    expect(getNextId(data, 9, null)).toBe(null);
  });
  test('for non-existent nodeId', () => {
    expect(getNextId(data, 999, null)).toBe(null);
  });
});

describe('getFirstChild', () => {
  test('root', () => {
    expect(getFirstChildId(data, 1)).toBe(2);
  });
  test('deep', () => {
    expect(getFirstChildId(data, 2)).toBe(3);
  });
  test('leaf', () => {
    expect(getFirstChildId(data, 3)).toBe(null);
  });
  test('leaf with siblings', () => {
    expect(getFirstChildId(data, 6)).toBe(null);
  });
});
