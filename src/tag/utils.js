/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';

const JOINABLE_TYPES = new Set(['string', 'number']);

// Checks the children of a React component to ensure every value is a number
// or a string. If they are, they are joined and returned. Useful for collecting
// text from the child of a node to use as an attribute.
export function getTextFromChildren(children: ?React$Node) {
  const childList = React.Children.toArray(children).filter(
    child => child !== null && child !== undefined,
  );

  if (!childList.length) {
    return null;
  }

  const isJoinable = childList.every(child => JOINABLE_TYPES.has(typeof child));

  if (!isJoinable) {
    return null;
  }

  // Join on an empty string to preserve React's whitespace handling:
  // <Tag>foo{'bar'}baz</Tag> => 'foobar'
  // <Tag>foo {'bar'} baz</Tag> => 'foo bar baz'
  return childList.join('');
}
