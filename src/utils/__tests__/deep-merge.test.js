// @flow
import deepMerge from '../deep-merge';

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
});
