// @flow
import React from 'react';
import {mount} from 'enzyme';

describe('Stateful radiogroup', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide overrides components to render', function() {
    jest.mock('./radio', () => jest.fn(() => <div>test</div>));
    const {
      StyledRoot,
      StyledLabel,
      StyledRadioMark,
      StyledInput,
      StyledRadio,
      StatefulRadioGroup,
    } = require('./index');
    allProps.overrides = {
      Root: StyledRoot,
      Label: StyledLabel,
      RadioMark: StyledRadioMark,
      Input: StyledInput,
    };
    const radio: any = require('./radio');
    wrapper = mount(
      <StatefulRadioGroup {...allProps}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>,
    );
    const {overrides} = radio.mock.calls[0][0];
    expect(overrides).toEqual({
      Root: StyledRoot,
      Checkmark: StyledRadioMark,
      Label: StyledLabel,
      Input: StyledInput,
    });
  });
});
