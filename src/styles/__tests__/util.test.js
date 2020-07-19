/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable */
import {expandBorderRadiusStyles, expandBorderStyles} from '../util.js';

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

test('expandBorderRadiusStyles', () => {
  const borderRadius = '3px';
  expect(expandBorderRadiusStyles(borderRadius)).toEqual({
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    borderBottomLeftRadius: '3px',
  });
});
