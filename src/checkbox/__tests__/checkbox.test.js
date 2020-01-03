/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env node */
import * as React from 'react';
import {mount, shallow} from 'enzyme';

import {
  StyledRoot,
  StyledLabel,
  StyledCheckmark,
  StyledInput,
  Checkbox as StatelessCheckbox,
} from '../index.js';

describe('Stateless checkbox', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    overrides,
    isError,
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    overrides = {
      Root: StyledRoot,
      Checkmark: StyledCheckmark,
      Label: StyledLabel,
      Input: StyledInput,
    };
    isError = false;
    events = {
      onChange: mockFn,
    };
    allProps = {
      overrides,
      ...events,
      labelPlacement: 'left',
      children: 'some',
      isError: isError,
      inputRef: React.createRef(),
      autoFocus: false,
      isIndeterminate: false,
      disabled: false,
      checked: false,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([['Root'], ['Label'], ['Checkmark'], ['Input']])(
    'should default to standard subcomponent for %s',
    subcomponent => {
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      const expectedProps = {
        Root: StyledRoot,
        Label: StyledLabel,
        Checkmark: StyledCheckmark,
        Input: StyledInput,
      };
      const actualComp = wrapper.find(expectedProps[subcomponent]);
      expect(actualComp.length).toEqual(1);
    },
  );

  test('should show label text in label', function() {
    const mockComp = jest.fn(() => <div>test</div>);
    overrides.Label = mockComp;
    allProps.children = 'super-duper label';
    wrapper = mount(<StatelessCheckbox {...allProps} />);
    expect(mockComp.mock.calls[0][0].children).toEqual(allProps.children);
  });

  test.each([['top', 0], ['left', 0], ['right', 3], ['bottom', 3]])(
    'should place label according to dock to %s',
    (labelPlacement, index) => {
      const mockComp = jest.fn(() => <div>test</div>);
      overrides.Root = mockComp;
      allProps.children = 'super-duper label';
      allProps.labelPlacement = labelPlacement;
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      const subComp = mockComp.mock.calls[0][0].children[index];
      const isLabel = comp => comp.props.children === allProps.children;
      expect(isLabel(subComp)).toBeTruthy();
    },
  );

  test('should focus on element', function() {
    const mockFocus = jest.fn();
    const current = global.document.createElement('input');
    current.focus = mockFocus;
    allProps.autoFocus = true;
    allProps.inputRef = {
      current: current,
    };
    wrapper = shallow(<StatelessCheckbox {...allProps} />);
    expect(mockFocus).toHaveBeenCalled();
  });
  describe('Events', function() {
    let events, instance, event;
    event = {};
    const handlers = [
      ['onMouseEnter', {isHovered: true}, true],
      ['onMouseLeave', {isHovered: false, isActive: false}, true],
      ['onMouseUp', {isActive: false}, true],
      ['onMouseDown', {isActive: true}, true],
      ['onFocus', {isFocused: true}, false],
      ['onBlur', {isFocused: false}, false],
    ];
    beforeEach(function() {
      events = {
        onMouseEnter: jest.fn(),
        onMouseLeave: jest.fn(),
        onFocus: jest.fn(),
        onBlur: jest.fn(),
      };
      allProps = {...allProps, ...events};
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      instance = wrapper.instance();
    });

    test.each(handlers)(
      'should call handler for %s event if it is present',
      (eventHandler, state, internalEvent) => {
        const setStateMock = jest.spyOn(instance, 'setState');
        // $FlowFixMe
        const handler = instance[eventHandler];
        handler(event);
        if (!internalEvent) {
          expect(events[eventHandler]).toHaveBeenCalledWith(event);
        }
        expect(setStateMock).toHaveBeenCalledWith(state);
      },
    );
  });
});
