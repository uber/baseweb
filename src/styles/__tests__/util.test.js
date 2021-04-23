/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable */
import {expandBorderStyles} from '../util.js';

test('expandBorderStyles', () => {
  const shorthandStyles = {
    borderWidth: '3px',
    borderColor: 'red',
    borderStyle: 'solid',
  };
  expect(expandBorderStyles(shorthandStyles)).toEqual({
    borderTopWidth: '3px',
    borderTopStyle: 'solid',
    borderTopColor: 'red',
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'red',
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'red',
    borderRightWidth: '3px',
    borderRightStyle: 'solid',
    borderRightColor: 'red',
  });
});
