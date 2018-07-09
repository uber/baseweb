// @flow
import React from 'react';
import {mount} from 'enzyme';
import {withAll} from '../test/test-utils';

import {
  StyledRoot,
  StyledLabel,
  StyledCheckmark,
  StyledInput,
  Checkbox as StatelessCheckbox,
} from './index';

describe('Checkbox', function() {
  let wrapper;
  beforeEach(function() {});

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  describe('Stateless checkbox', function() {
    let allProps, sharedProps, components, $error, mockFn;
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
      $error = false;
      allProps = {
        components,
        onChange: mockFn,
        onMouseEnter: mockFn,
        onMouseLeave: mockFn,
        onFocus: mockFn,
        onBlur: mockFn,
        $placement: 'left',
        $label: 'some',
        $error: $error,
        $inputRef: React.createRef(),
        $isFocused: false,
        $isIndeterminate: false,
        ...sharedProps,
      };
    });

    test.each([['Root'], ['Label'], ['Checkmark'], ['Input']])(
      'should send shared components to %s',
      subcomponent => {
        const mockComp = jest.fn(() => <div>{subcomponent}</div>);
        components[subcomponent] = mockComp;
        wrapper = mount(withAll(() => <StatelessCheckbox {...allProps} />));
        const actualProps = mockComp.mock.calls[0][0];
        let expectedProps =
          subcomponent !== 'Input'
            ? {$error, ...sharedProps}
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
                $isFocused: allProps.$isFocused,
                $isIndeterminate: allProps.$isIndeterminate,
                ...expectedProps,
              }
            : expectedProps;
        expect(actualProps).toMatchObject(expectedProps);
      },
    );

    test('should show label text in label', function() {
      const mockComp = jest.spyOn(components, 'Label');
      allProps.$label = 'super-puper label';
      wrapper = mount(withAll(() => <StatelessCheckbox {...allProps} />));
      expect(mockComp.mock.calls[0][0].children).toEqual(allProps.$label);
    });

    test.each([['top', 0], ['left', 0], ['right', 3], ['bottom', 3]])(
      'should place label according to dock to %s',
      ($placement, index) => {
        const mockComp = jest.spyOn(components, 'Root');
        allProps.$label = 'super-puper label';
        allProps.$placement = $placement;
        wrapper = mount(withAll(() => <StatelessCheckbox {...allProps} />));
        const subComp = mockComp.mock.calls[0][0].children[index];
        const isLabel = comp => comp.props.children === allProps.$label;
        expect(isLabel(subComp)).toBeTruthy();
      },
    );
  });
});
