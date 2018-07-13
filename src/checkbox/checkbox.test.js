// @flow
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
    components,
    isError,
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    components = {
      Root: StyledRoot,
      Checkmark: StyledCheckmark,
      Label: StyledLabel,
      Input: StyledInput,
    };
    isError = false;
    events = {
      onChange: mockFn,
      onMouseEnter: mockFn,
      onMouseLeave: mockFn,
      onFocus: mockFn,
      onBlur: mockFn,
    };
    allProps = {
      components,
      ...events,
      labelPlacement: 'left',
      label: 'some',
      isError: isError,
      inputRef: React.createRef(),
      isFocused: false,
      isIndeterminate: false,
      disabled: false,
      checked: false,
      $theme: {},
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([['Root'], ['Label'], ['Checkmark'], ['Input']])(
    'should send shared props to %s',
    subcomponent => {
      const mockComp: any = jest.fn(() => <div>{subcomponent}</div>);
      components[subcomponent] = mockComp;
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      const actualProps = mockComp.mock.calls[0][0];
      const expectedProps = {
        Root: {
          disabled: allProps.disabled,
          $isError: allProps.isError,
          $theme: allProps.$theme,
        },
        Label: {
          disabled: allProps.disabled,
          $labelPlacement: allProps.labelPlacement,
          $theme: allProps.$theme,
        },
        Checkmark: {
          disabled: allProps.disabled,
          $isError: allProps.isError,
          checked: allProps.checked,
          $isFocused: allProps.isFocused,
          $theme: allProps.$theme,
          $isIndeterminate: allProps.isIndeterminate,
        },
        Input: {
          type: 'checkbox',
          $theme: allProps.$theme,
          $ref: allProps.inputRef,
          ...events,
        },
      };
      expect(actualProps).toMatchObject(expectedProps[subcomponent]);
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
    (labelPlacement, index) => {
      const mockComp = jest.fn(() => <div>test</div>);
      components.Root = mockComp;
      allProps.label = 'super-puper label';
      allProps.labelPlacement = labelPlacement;
      wrapper = mount(<StatelessCheckbox {...allProps} />);
      const subComp = mockComp.mock.calls[0][0].children[index];
      const isLabel = comp => comp.props.children === allProps.label;
      expect(isLabel(subComp)).toBeTruthy();
    },
  );

  test('should focus on element', function() {
    const mockFocus = jest.fn();
    const current = global.document.createElement('input');
    current.focus = mockFocus;
    allProps.isFocused = true;
    allProps.inputRef = {
      current: current,
    };
    wrapper = shallow(<StatelessCheckbox {...allProps} />);
    expect(mockFocus).toHaveBeenCalled();
  });
});
