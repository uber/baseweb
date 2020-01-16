/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import * as Utils from '../utils.js';

describe('Tag Utils - getTextFromChildren', () => {
  it('handles no children', () => {
    expect(Utils.getTextFromChildren()).toBe(null);
    expect(Utils.getTextFromChildren(null)).toBe(null);
    expect(Utils.getTextFromChildren(undefined)).toBe(null);
  });

  it('handles one child', () => {
    expect(Utils.getTextFromChildren('')).toBe('');
    expect(Utils.getTextFromChildren('foo')).toBe('foo');
    expect(Utils.getTextFromChildren(0)).toBe('0');
    expect(Utils.getTextFromChildren(123)).toBe('123');
  });

  it('handles multiple children', () => {
    expect(Utils.getTextFromChildren(['foo', 123])).toBe('foo123');
    expect(Utils.getTextFromChildren(['foo', null, 123])).toBe('foo123');
  });

  it('ignores non-joinable children', () => {
    expect(Utils.getTextFromChildren(<div />)).toBe(null);
    expect(Utils.getTextFromChildren(['foo', <div key={1} />, 123])).toBe(null);
  });
});
