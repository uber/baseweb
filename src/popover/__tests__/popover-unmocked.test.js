/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {mount} from 'enzyme';
import {Popover} from '../index.js';

describe('Popover', () => {
  // Issue #3265
  test('does not throw when anchor component is not refable', () => {
    const NonForwardRefFunctionalComponent = () => <>hello</>;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    // $FlowFixMe (it's okay for this test)
    console.error = jest.fn(); // not using spy because it also calls the original console.error
    // $FlowFixMe
    console.warn = jest.fn();

    mount(
      <Popover isOpen content="foo">
        <NonForwardRefFunctionalComponent />
      </Popover>,
    );

    expect(console.error).toBeCalledTimes(0); // React doesn't throw, it logs
    expect(console.warn).toBeCalledWith(
      `[baseui][TetherBehavior] ref has not been passed to the Popper's anchor element.\n` +
        `See how to pass the ref to an anchor element in the Popover example\n` +
        `http://baseui.design/components/popover#anchor-ref-handling-example`,
    );

    // $FlowFixMe
    console.error = originalConsoleError;

    // $FlowFixMe
    console.warn = originalConsoleWarn;
  });
});
