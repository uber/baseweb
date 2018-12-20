/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';

describe('Stateful slider', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
    jest.mock('../slider', () => jest.fn(() => <div>test</div>));
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide default styled components to render', function() {
    const {
      StyledRoot,
      StyledAxis,
      StyledTick,
      StyledThumb,
      StyledTickBar,
      StyledAxisRange,
      StatefulSlider,
    } = require('../index');

    allProps.overrides = {
      Root: StyledRoot,
      Axis: StyledAxis,
      Tick: StyledTick,
      Thumb: StyledThumb,
      TickBar: StyledTickBar,
      AxisRange: StyledAxisRange,
    };
    const slider: any = require('../slider');
    wrapper = mount(<StatefulSlider {...allProps} />);
    const {overrides} = slider.mock.calls[0][0];
    expect(overrides).toEqual({
      Root: StyledRoot,
      Axis: StyledAxis,
      Tick: StyledTick,
      Thumb: StyledThumb,
      TickBar: StyledTickBar,
      AxisRange: StyledAxisRange,
    });
  });

  test('should pass all the other props to stateless slider', function() {
    const otherProps = {
      someProp: 'some other slider prop',
    };
    allProps = {...allProps, ...otherProps};
    const {StatefulSlider} = require('../index');
    const slider: any = require('../slider');
    wrapper = mount(<StatefulSlider {...allProps} />);
    // eslint-disable-next-line no-unused-vars
    const {overrides, ...rest} = slider.mock.calls[1][0];
    expect(rest).toMatchObject({
      someProp: 'some other slider prop',
    });
  });
});
