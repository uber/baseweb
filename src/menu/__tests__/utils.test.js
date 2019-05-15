/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as Utils from '../utils.js';

describe.only('Menu Utils - scrollItemIntoView', () => {
  // |=======================| <-- top of parent window (at 0)
  // | |-------------------| |
  // | |       50 ht       | |
  // | |-------------------| |
  // |=======================| <-- bottom of parent window (at 50)
  // | |-------------------| |
  // | |       50 ht       | | <-- child to scroll into view
  // | |-------------------| |
  // |_______________________| <-- bottom of parent scroll height (at 100)

  it('scrolls down to second item', () => {
    const parent = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        height: 50,
        bottom: 50,
        top: 0,
      }),
      scrollHeight: 100,
      scrollTop: 0,
    };

    const child = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        height: 50,
        bottom: 100,
        top: 50,
      }),
      offsetTop: 50,
    };

    // $FlowFixMe <-- this is because we are not testing with full elements.
    Utils.scrollItemIntoView(child, parent);
    expect(parent.scrollTop).toBe(50);
  });

  // -------------------------
  // | |-------------------| |
  // | |       50 ht       | |
  // | |-------------------| |
  // |=======================| <-- top of parent window (at 50)
  // | |-------------------| |
  // | |       50 ht       | |
  // | |-------------------| |
  // |=======================| <-- bottom of parent window (at 100)
  // | |-------------------| |
  // | |       50 ht       | | <-- child to scroll into view
  // | |-------------------| |
  // |_______________________| <-- bottom of parent scroll height (at 150)

  it('scrolls down to subsequent item', () => {
    const parent = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        height: 50,
        bottom: 100,
        top: 50,
      }),
      scrollHeight: 150,
      scrollTop: 50,
    };

    const child = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        height: 50,
        bottom: 150,
        top: 100,
      }),
      offsetTop: 100,
    };

    // $FlowFixMe <-- this is because we are not testing with full elements.
    Utils.scrollItemIntoView(child, parent);
    expect(parent.scrollTop).toBe(100);
  });

  // -------------------------
  // | |-------------------| |
  // | |       50 ht       | | <-- child to scroll into view
  // | |-------------------| |
  // |=======================| <-- top of parent window (at 50)
  // | |-------------------| |
  // | |       50 ht       | |
  // | |-------------------| |
  // |=======================| <-- bottom of parent window (at 100)

  it('scrolls up to fist item', () => {
    const parent = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 50,
        height: 50,
        bottom: 100,
      }),
      scrollHeight: 100,
      scrollTop: 50,
    };

    const child = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        height: 50,
        bottom: 50,
        top: 0,
      }),
      offsetTop: 0,
    };

    // $FlowFixMe <-- this is because we are not testing with full elements.
    Utils.scrollItemIntoView(child, parent);
    expect(parent.scrollTop).toBe(0);
  });

  // -------------------------
  // | |-------------------| |
  // | |       50 ht       | | <-- child to scroll into view
  // | |-------------------| |
  // |=======================| <-- top of parent window (at 50)
  // | |-------------------| |
  // | |       50 ht       | |
  // | |-------------------| |
  // |=======================| <-- bottom of parent window (at 100)
  // | |-------------------| |
  // | |       50 ht       | |
  // | |-------------------| |
  // |_______________________| <-- bottom of parent scroll height (at 150)

  it('scrolls up to subsequent item', () => {
    const parent = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 50,
        height: 50,
        bottom: 100,
      }),
      scrollHeight: 150,
      scrollTop: 50,
    };

    const child = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        height: 50,
        bottom: 50,
        top: 0,
      }),
      offsetTop: 0,
    };

    // $FlowFixMe <-- this is because we are not testing with full elements.
    Utils.scrollItemIntoView(child, parent);
    expect(parent.scrollTop).toBe(0);
  });
});
