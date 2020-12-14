/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import deepMerge from '../deep-merge.js';

describe('deepMerge', () => {
  test('performs deep merge on target', () => {
    const target = {foo: {bar: {baz: true, quux: true}}};
    const source = {foo: {bar: {baz: false}}};
    const ret = deepMerge(target, source);
    expect(ret).toBe(target);
    expect(target).toEqual({foo: {bar: {baz: false, quux: true}}});
  });

  test('can handle three way merge', () => {
    const target = {foo: 1, bar: 2};
    const source1 = {foo: 2, baz: 3};
    const source2 = {foo: 3, quux: 4};
    const ret = deepMerge({}, target, source1, source2);
    expect(ret).toEqual({foo: 3, bar: 2, baz: 3, quux: 4});
  });

  test('merges array and object properties absent in target correctly', () => {
    const target = {};
    const source = {foo: {bar: {a: 1, b: 2}}, baz: {quux: ['a', 'b', 'c']}};
    const ret = deepMerge({}, target, source);
    expect(ret).toEqual({
      foo: {bar: {a: 1, b: 2}},
      baz: {quux: ['a', 'b', 'c']},
    });
  });
});
