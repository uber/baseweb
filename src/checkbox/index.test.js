// @flow
import React from 'react';
import {mount, shallow} from 'enzyme';
import {STATE_TYPE} from './constants';

import {
  StyledRoot,
  StyledLabel,
  StyledCheckmark,
  StyledInput,
  StatefulContainer,
  Checkbox as StatelessCheckbox,
} from './index';
import type {StateReducer} from './types';

describe('Checkbox', function() {
  let wrapper;
  beforeEach(function() {});

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  describe('Stateless checkbox', function() {
    let allProps: any, sharedProps, components, error, mockFn;
    beforeEach(function() {
      sharedProps = {
        prop1: 'some shared props',
        checked: true,
        disabled: false,
      };
      mockFn = jest.fn();
      components = {
        Root: StyledRoot,
        Checkmark: StyledCheckmark,
        Label: StyledLabel,
        Input: StyledInput,
      };
      error = false;
      allProps = {
        components,
        onChange: mockFn,
        onMouseEnter: mockFn,
        onMouseLeave: mockFn,
        onFocus: mockFn,
        onBlur: mockFn,
        placement: 'left',
        label: 'some',
        error: error,
        inputRef: React.createRef(),
        isFocused: false,
        isIndeterminate: false,
        ...sharedProps,
      };
    });

    test.each([['Root'], ['Label'], ['Checkmark'], ['Input']])(
      'should send shared props to %s',
      subcomponent => {
        const mockComp: any = jest.fn(() => <div>{subcomponent}</div>);
        components[subcomponent] = mockComp;
        wrapper = mount(<StatelessCheckbox {...allProps} />);
        const actualProps = mockComp.mock.calls[0][0];
        let expectedProps =
          subcomponent !== 'Input'
            ? {$error: error, ...sharedProps}
            : {
                onChange: mockFn,
                onMouseEnter: mockFn,
                onMouseLeave: mockFn,
                onFocus: mockFn,
                onBlur: mockFn,
                type: 'checkbox',
                ...sharedProps,
              };
        expectedProps =
          subcomponent === 'Checkmark'
            ? {
                $isFocused: allProps.isFocused,
                $isIndeterminate: allProps.isIndeterminate,
                ...expectedProps,
              }
            : expectedProps;
        expect(actualProps).toMatchObject(expectedProps);
      },
    );

    test('should show label text in label', function() {
      const mockComp = jest.fn(() => <div>test</div>);
      components.Label = mockComp;
      allProps.label = 'super-puper label';
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      expect(mockComp.mock.calls[0][0].children).toEqual(allProps.label);
    });

    test.each([['top', 0], ['left', 0], ['right', 3], ['bottom', 3]])(
      'should place label according to dock to %s',
      (placement, index) => {
        const mockComp = jest.fn(() => <div>test</div>);
        components.Root = mockComp;
        allProps.label = 'super-puper label';
        allProps.placement = placement;
        wrapper = mount(<StatelessCheckbox {...allProps} />);
        const subComp = mockComp.mock.calls[0][0].children[index];
        const isLabel = comp => comp.props.children === allProps.label;
        expect(isLabel(subComp)).toBeTruthy();
      },
    );

    test('should focus on element', function() {
      const mockComp = jest.fn();
      const current = global.document.createElement('input');
      current.focus = mockComp;
      allProps.isFocused = true;
      allProps.inputRef = {
        current: current,
      };
      wrapper = shallow(<StatelessCheckbox {...allProps} />);
      expect(mockComp).toHaveBeenCalled();
    });
  });

  describe('Stateful container', function() {
    let allProps: any, childFn;

    beforeEach(function() {
      const stateReducer: StateReducer = (type, nextState) => nextState;
      childFn = jest.fn(() => <div>test</div>);
      allProps = {
        children: childFn,
        initialState: {},
        stateReducer: stateReducer,
        prop1: 'some other propq',
      };
    });

    test('should provide all needed props to children render func', function() {
      wrapper = mount(<StatefulContainer {...allProps} />);
      const actualProps = childFn.mock.calls[0][0];
      expect(actualProps).toMatchObject({
        prop1: allProps.prop1,
      });
    });

    test('should provide initial state as part of state', function() {
      allProps.initialState = {prop3: 'some initial state'};
      wrapper = mount(<StatefulContainer {...allProps} />);
      const actualProps = childFn.mock.calls[0][0];
      expect(actualProps).toMatchObject(allProps.initialState);
    });

    describe('Events', function() {
      let events, stateReducerMock, instance, event;
      event = {target: {checked: true}};
      const handlers = [
        ['onChange', STATE_TYPE.change, {checked: event.target.checked}],
        ['onMouseEnter', STATE_TYPE.hover, {$isHovered: true}],
        ['onMouseLeave', STATE_TYPE.unhover, {$isHovered: false}],
        ['onFocus', STATE_TYPE.focus, {isFocused: true}],
        ['onBlur', STATE_TYPE.blur, {isFocused: false}],
        ['onBlur', STATE_TYPE.blur, {isFocused: false}],
      ];
      beforeEach(function() {
        events = {
          onChange: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn(),
          onFocus: jest.fn(),
          onBlur: jest.fn(),
        };
        allProps = {...allProps, ...events};
        stateReducerMock = jest.fn();
        allProps.stateReducer = stateReducerMock;
        wrapper = mount(<StatefulContainer {...allProps} />);
        instance = wrapper.instance();
      });

      test.each(handlers)(
        'should call state reducer to apply new state for %s event',
        (eventHandler, type, newState) => {
          const handler = instance[eventHandler];
          handler(event);
          expect(stateReducerMock).toHaveBeenCalledWith(
            type,
            newState,
            {},
            event,
          );
        },
      );

      test.each(handlers)(
        'should call handler for %s event if it is present',
        eventHandler => {
          const handler = instance[eventHandler];
          handler(event);
          expect(events[eventHandler]).toHaveBeenCalledWith(event);
        },
      );
    });
  });
});
