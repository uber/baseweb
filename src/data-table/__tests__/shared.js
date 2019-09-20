/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// at this point it's likely worth pulling in react-testing-library, but
// it seems to require the latest React@16.9 with async act. this maybe a
// simple update for applications depending on baseui, but i hestitate to
// require others to update react just so we can use a testing tool.
// https://github.com/facebook/react/issues/10135#issuecomment-314441175

// eslint-disable-next-line flowtype/no-weak-types
export function setNativeValue(element: HTMLElement, value: any) {
  // $FlowFixMe
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);

  // $FlowFixMe
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    'value',
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    // $FlowFixMe
    prototypeValueSetter.call(element, value);
  } else {
    // $FlowFixMe
    valueSetter.call(element, value);
  }
}
