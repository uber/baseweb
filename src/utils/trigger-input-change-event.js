/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window */

import createEvent from './create-event.js';

export default function triggerInputChangeEvent(
  input: HTMLInputElement,
  value: string,
) {
  const nativeInputValue = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  );
  if (nativeInputValue) {
    const nativeInputValueSetter = nativeInputValue.set;
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, value);
      const event = createEvent('input');
      input.dispatchEvent(event);
    }
  }
}
