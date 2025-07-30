/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { setItemActive } from '..';
import { defaultMapItemToNode } from '../utils';

describe('setItemActive', () => {
  it('sets specified item active', () => {
    const items = [{ label: 'one' }, { label: 'two' }];
    const nextActive = items[0];
    const nextItems = setItemActive(items, nextActive);

    expect(nextItems[0].active).toBe(true);
    expect(nextItems[1].active).toBe(false);
  });

  it('sets parent item active when child set active', () => {
    const items = [
      {
        label: 'A',
        children: [{ label: 'A A' }, { label: 'A B' }],
      },
      {
        label: 'B',
        children: [{ label: 'B A' }, { label: 'B B' }],
      },
    ];

    const nextActive = items[1].children[1];
    const nextItems = setItemActive(items, nextActive);

    expect(nextItems[0].active).toBe(false);
    // @ts-ignore
    expect(nextItems[0].children[0].active).toBe(false);
    // @ts-ignore
    expect(nextItems[0].children[1].active).toBe(false);

    expect(nextItems[1].active).toBe(true);
    // @ts-ignore
    expect(nextItems[1].children[0].active).toBe(false);
    // @ts-ignore
    expect(nextItems[1].children[1].active).toBe(true);
  });

  it('unsets non active items', () => {
    const items = [
      {
        label: 'A',
        children: [{ label: 'A A' }, { label: 'A B' }],
      },
      {
        label: 'B',
        children: [{ label: 'B A' }, { label: 'B B', active: true }],
        active: true,
      },
    ];

    const nextActive = items[0].children[0];
    const nextItems = setItemActive(items, nextActive);

    expect(nextItems[0].active).toBe(true);
    // @ts-ignore
    expect(nextItems[0].children[0].active).toBe(true);
    // @ts-ignore
    expect(nextItems[0].children[1].active).toBe(false);

    expect(nextItems[1].active).toBe(false);
    // @ts-ignore
    expect(nextItems[1].children[0].active).toBe(false);
    // @ts-ignore
    expect(nextItems[1].children[1].active).toBe(false);
  });

  it('custom getUniqueIdentifier', () => {
    const items = [
      { label: 'one', info: { id: 1 } },
      { label: 'two', info: { id: 2 } },
    ];
    const nextActive = items[0];
    // @ts-ignore
    const getId = (item) => (item.info ? item.info.id : item.label);
    const nextItems = setItemActive(items, nextActive, getId);

    expect(nextItems[0].active).toBe(true);
    expect(nextItems[1].active).toBe(false);
  });
});
describe('defaultMapItemToNode', () => {
  it('returns the label of the item', () => {
    const item = { label: 'test' };
    const result = defaultMapItemToNode(item);
    expect(result).toBe('test');
  });

  it('throws an error if item.label is missing in development mode', () => {
    const originalDev = global.__DEV__;
    global.__DEV__ = true;

    const item = {};
    // @ts-expect-error
    expect(() => defaultMapItemToNode(item)).toThrow();

    global.__DEV__ = originalDev;
  });

  it('does not throw an error if item.label is missing in production mode', () => {
    const originalDev = global.__DEV__;
    global.__DEV__ = false;

    const item = {};
    // @ts-expect-error
    expect(() => defaultMapItemToNode(item)).not.toThrow();

    global.__DEV__ = originalDev;
  });
});
