/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {ProgressBar, StyledLabel} from '../index.js';
import {styled} from '../../styles/index.js';

describe('Stateless progress bar', function() {
  let wrapper,
    handlers = {};
  let allProps: any = {},
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    handlers = {
      getProgressLabel: mockFn,
    };
    allProps = {
      value: 75,
      ...handlers,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should render component', function() {
    wrapper = mount(<ProgressBar {...allProps} />);
    expect(wrapper).toMatchSnapshot('Component has correct render');
  });

  test('should render label', function() {
    allProps.showLabel = true;
    wrapper = mount(<ProgressBar {...allProps} />);
    const label = wrapper.find(StyledLabel);
    expect(label.length).toBe(1);
  });

  test.each([['BarProgress'], ['Label'], ['Bar'], ['Root']])(
    'should render overridden subcomponent %s',
    subcomponentName => {
      const Subcomponent = styled('div', {});
      allProps.overrides = {
        [subcomponentName]: Subcomponent,
      };
      allProps.showLabel = true;
      wrapper = mount(<ProgressBar {...allProps} />);
      const instance = wrapper.find(Subcomponent);
      expect(instance.length).toBe(1);
    },
  );

  describe('Custom progress label', function() {
    const customData = 'data-custom-label-for-progress-bar';
    beforeEach(function() {
      allProps.showLabel = true;
      allProps.getProgressLabel = jest
        .fn()
        .mockImplementation(() => <div {...{[customData]: true}} />);
      wrapper = mount(<ProgressBar {...allProps} />);
    });

    test('should render custom label provided', function() {
      const customLabel = wrapper.find(`[${customData}]`);
      expect(customLabel.length).toBe(1);
    });
  });
});
