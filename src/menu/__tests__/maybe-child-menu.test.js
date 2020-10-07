/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {BaseProvider} from '../../index.js';
import {Popover} from '../../popover/index.js';

import MaybeChildMenu from '../maybe-child-menu.js';

describe('MaybeChildMenu', () => {
  it('does not render popover if getChildMenu is undefined', () => {
    const wrapper = mount(
      <MaybeChildMenu
        isOpen={true}
        getChildMenu={null}
        item={{label: 'item'}}
        resetParentMenu={() => {}}
      >
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
      <BaseProvider>
        <MaybeChildMenu
          isOpen={true}
          getChildMenu={() => <button>child menu</button>}
          item={{label: 'item'}}
          resetParentMenu={() => {}}
        >
          <div>child</div>
        </MaybeChildMenu>
      </BaseProvider>,
    );

    expect(wrapper.find(Popover)).not.toBeNull();
  });

  it('renders with components overrides', () => {
    const NewPopover = () => <div id="popover" />;
    const overrides = {
      ChildMenuPopover: {
        component: NewPopover,
        props: {
          showArrow: true,
        },
      },
    };
    const component = mount(
      <MaybeChildMenu
        isOpen={true}
        getChildMenu={() => <button>child menu</button>}
        item={{label: 'item'}}
        resetParentMenu={() => {}}
        overrides={overrides}
      >
        <div>child</div>
      </MaybeChildMenu>,
    );
    expect(component.find(Popover)).not.toExist();
    expect(component.find(NewPopover)).toExist();
    expect(component.find(NewPopover).prop('showArrow')).toBeTruthy();
  });
});
