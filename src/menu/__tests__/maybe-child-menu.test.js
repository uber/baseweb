/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';

import MaybeChildMenu from '../maybe-child-menu.js';

describe('MaybeChildMenu', () => {
  it('does not render popover if getChildMenu is undefined', () => {
    const wrapper = mount(
      <MaybeChildMenu getChildMenu={null} item={{label: 'item'}}>
        <div>child</div>
      </MaybeChildMenu>,
    );

    expect(
      wrapper
        .children()
        .first()
        .name(),
    ).toBe('div');
  });
  it('renders popover if getChildMenu is provided', () => {
    const wrapper = mount(
      <MaybeChildMenu
        getChildMenu={() => <button>child menu</button>}
        item={{label: 'item'}}
      >
        <div>child</div>
      </MaybeChildMenu>,
    );

    expect(
      wrapper
        .children()
        .first()
        .name(),
    ).toBe('StatefulPopover');
  });
});
