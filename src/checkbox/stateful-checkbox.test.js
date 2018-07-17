// @flow
import React from 'react';
import {mount} from 'enzyme';

describe('Stateful checkbox', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
    jest.mock('./checkbox', () => jest.fn(() => <div>test</div>));
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide default styled components to render', function() {
    const {
      StyledRoot,
      StyledLabel,
      StyledCheckmark,
      StyledInput,
      StatefulCheckbox,
    } = require('./index');
    allProps.components = {
      Root: StyledRoot,
      Label: StyledLabel,
      Checkmark: StyledCheckmark,
      Input: StyledInput,
    };
    const checkbox: any = require('./checkbox');
    wrapper = mount(<StatefulCheckbox {...allProps} />);
    const {components} = checkbox.mock.calls[0][0];
    expect(components).toEqual({
      Root: StyledRoot,
      Checkmark: StyledCheckmark,
      Label: StyledLabel,
      Input: StyledInput,
    });
  });

  test('should pass all the other props to stateless checkbox', function() {
    const otherProps = {
      someProp: 'some other props',
      autoFocus: false,
    };
    allProps = {...allProps, ...otherProps};
    const {StatefulCheckbox} = require('./index');
    const checkbox: any = require('./checkbox');
    wrapper = mount(<StatefulCheckbox {...allProps} />);
    // eslint-disable-next-line no-unused-vars
    const {components, ...rest} = checkbox.mock.calls[1][0];
    expect(rest).toMatchObject({
      someProp: 'some other props',
      checked: false,
      autoFocus: false,
      isIndeterminate: false,
    });
  });
});
