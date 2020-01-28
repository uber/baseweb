/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import Popper from 'popper.js';
import {TetherBehavior} from '../index.js';
import {mount} from 'enzyme';

// Mock popper.js (see __mocks__ directory for impl)
jest.mock('popper.js');

describe('TetherBehavior', () => {
  let wrapper;

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  test('basic render', () => {
    const onPopperUpdate = jest.fn();
    class Wrapper extends React.Component<{}, {isMounted: boolean}> {
      anchorRef = React.createRef();
      popperRef = React.createRef();
      state = {isMounted: false};
      componentDidMount() {
        this.setState({isMounted: true});
      }
      render() {
        return (
          <>
            <div ref={this.anchorRef}>This is anchor</div>
            <TetherBehavior
              anchorRef={this.anchorRef.current}
              popperRef={this.popperRef.current}
              onPopperUpdate={onPopperUpdate}
            >
              <div ref={this.popperRef}>This is popper</div>
            </TetherBehavior>
          </>
        );
      }
    }
    const wrapper = mount(<Wrapper />);
    // Popper library should have been initialized
    expect(Popper).toHaveBeenCalled();
    const tethered = wrapper.childAt(1);
    // $FlowFixMe
    const calls = Popper.mock.calls;

    expect(tethered).toHaveText('This is popper');
    expect(calls[0][0]).toBe(wrapper.instance().anchorRef.current);
    expect(calls[0][1]).toBe(wrapper.instance().popperRef.current);
    expect(calls[0][2]).toMatchObject({
      modifiers: {
        // $FlowFixMe
        applyReactStyle: {fn: tethered.instance().onPopperUpdate},
      },
    });
    const popperUpdateData = {
      offsets: {
        popper: {
          top: 10,
          left: 10,
        },
        arrow: {
          top: 10,
          left: 10,
        },
      },
      placement: 'left-start',
    };
    // $FlowFixMe
    tethered.instance().onPopperUpdate(popperUpdateData);
    expect(onPopperUpdate).toHaveBeenCalled();
    expect(onPopperUpdate.mock.calls[0][0]).toMatchObject({
      popper: popperUpdateData.offsets.popper,
      arrow: popperUpdateData.offsets.arrow,
    });
    expect(onPopperUpdate.mock.calls[0][1]).toBe(popperUpdateData);
  });
});
