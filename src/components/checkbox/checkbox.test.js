// @flow
/* eslint-env node */
import React from 'react';
import {mount, shallow} from 'enzyme';

import {
  StyledRoot,
  StyledLabel,
  StyledCheckmark,
  StyledInput,
  Checkbox as StatelessCheckbox,
} from './index';

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
    'should send props to %s',
    subcomponent => {
      const mockComp: any = jest.fn(() => <div>{subcomponent}</div>);
      overrides[subcomponent] = mockComp;
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      const instance = wrapper.instance();
      const sharedProps = {
        $isError: allProps.isError,
        $checked: allProps.checked,
        $isIndeterminate: allProps.isIndeterminate,
        $required: allProps.required,
        $disabled: allProps.disabled,
      };
      events = {
        onMouseEnter: instance.onMouseEnter,
        onMouseLeave: instance.onMouseLeave,
        onFocus: instance.onFocus,
        onBlur: instance.onBlur,
        ...events,
      };
      const actualProps = mockComp.mock.calls[0][0];
      const expectedProps = {
        Root: sharedProps,
        Label: {
          ...sharedProps,
          $labelPlacement: allProps.labelPlacement,
        },
        Checkmark: sharedProps,
        Input: {
          type: 'checkbox',
          disabled: false,
          $ref: allProps.inputRef,
          ...sharedProps,
          ...events,
        },
      };
      expect(actualProps).toMatchObject(expectedProps[subcomponent]);
    },
  );

  test.each([['Root'], ['Label'], ['Checkmark'], ['Input']])(
    'should default to standart subcomponent for %s',
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
    allProps.children = 'super-puper label';
    wrapper = mount(<StatelessCheckbox {...allProps} />);
    expect(mockComp.mock.calls[0][0].children).toEqual(allProps.children);
  });

  test.each([['top', 0], ['left', 0], ['right', 3], ['bottom', 3]])(
    'should place label according to dock to %s',
    (labelPlacement, index) => {
      const mockComp = jest.fn(() => <div>test</div>);
      overrides.Root = mockComp;
      allProps.children = 'super-puper label';
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
      ['onMouseEnter', {isHovered: true}, false],
      ['onMouseLeave', {isHovered: false}, false],
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
