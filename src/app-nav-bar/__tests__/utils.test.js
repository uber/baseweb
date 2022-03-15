/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import { setItemActive } from '../index.js';

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
    // $FlowFixMe - children may be undefined
    expect(nextItems[0].children[0].active).toBe(false);
    // $FlowFixMe - children may be undefined
    expect(nextItems[0].children[1].active).toBe(false);

    expect(nextItems[1].active).toBe(true);
    // $FlowFixMe - children may be undefined
    expect(nextItems[1].children[0].active).toBe(false);
    // $FlowFixMe - children may be undefined
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
    // $FlowFixMe - children may be undefined
    expect(nextItems[0].children[0].active).toBe(true);
    // $FlowFixMe - children may be undefined
    expect(nextItems[0].children[1].active).toBe(false);

    expect(nextItems[1].active).toBe(false);
    // $FlowFixMe - children may be undefined
    expect(nextItems[1].children[0].active).toBe(false);
    // $FlowFixMe - children may be undefined
    expect(nextItems[1].children[1].active).toBe(false);
  });

  it('custom getUniqueIdentifier', () => {
    const items = [
      { label: 'one', info: { id: 1 } },
      { label: 'two', info: { id: 2 } },
    ];
    const nextActive = items[0];
    const getId = (item) => (item.info ? item.info.id : item.label);
    const nextItems = setItemActive(items, nextActive, getId);

    expect(nextItems[0].active).toBe(true);
    expect(nextItems[1].active).toBe(false);
  });
});
