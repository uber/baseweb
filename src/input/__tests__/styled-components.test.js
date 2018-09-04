/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledLabel,
  StyledRoot,
  StyledInputEnhancer,
  StyledInputContainer,
  StyledInput,
  StyledCaption,
  SIZE,
  ADJOINED,
} from '../index';
import {ENHANCER_POSITION} from '../constants';

test('Input - StyledLabel - basic render', () => {
  const component = shallow(
    <StyledLabel $size={SIZE.default}>
      <span />
    </StyledLabel>,
  );
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledLabel has correct default styles',
  );
  component.setProps({
    $size: SIZE.compact,
    $disabled: true,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledLabel has correct styles when compact and disabled',
  );
});

test('Input - StyledRoot - basic render', () => {
  const component = shallow(
    <StyledRoot $size={SIZE.default}>
      <span />
    </StyledRoot>,
  );
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledRoot has correct default styles',
  );
  component.setProps({
    $size: SIZE.compact,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledRoot has correct styles when compact',
  );
});

test('Input - StyledInputEnhancer - basic render', () => {
  const component = shallow(
    <StyledInputEnhancer
      $size={SIZE.default}
      $position={ENHANCER_POSITION.start}
    >
      <span />
    </StyledInputEnhancer>,
  );
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputEnhancer has correct styles when default size and start position',
  );
  component.setProps({
    $size: SIZE.compact,
    $position: ENHANCER_POSITION.end,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputEnhancer has correct styles when compact and end position',
  );
});

test('Input - StyledInputContainer - basic render', () => {
  const component = shallow(
    <StyledInputContainer $size={SIZE.default} $adjoined={ADJOINED.none}>
      <span />
    </StyledInputContainer>,
  );
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct default styles',
  );
  component.setProps({
    $isFocused: true,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when focused',
  );
  component.setProps({
    $size: SIZE.compact,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when compact',
  );
  component.setProps({
    $adjoined: ADJOINED.left,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when has start enhancer',
  );
  component.setProps({
    $adjoined: ADJOINED.right,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when has end enhancer',
  );
  component.setProps({
    $adjoined: ADJOINED.both,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when has start and end enhancers',
  );
  component.setProps({
    $error: true,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when error',
  );
  component.setProps({
    $disabled: true,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInputContainer has correct styles when disabled',
  );
});

test('Input - StyledInput - basic render', () => {
  const component = shallow(<StyledInput $size={SIZE.default} />);
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInput has correct default styles',
  );
  component.setProps({
    $size: SIZE.compact,
    $disabled: true,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledInput has correct styles when compact and disabled',
  );
});

test('Input - StyledCaption - basic render', () => {
  const component = shallow(
    <StyledCaption $size={SIZE.default}>
      <span />
    </StyledCaption>,
  );
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledCaption has correct default styles',
  );
  component.setProps({
    $size: SIZE.compact,
    $error: true,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledCaption has correct styles when compact and error is boolean',
  );
  component.setProps({
    $error: <span>Error message</span>,
  });
  expect(component.instance().getStyles()).toMatchSnapshot(
    'StyledCaption has correct styles when error is a node',
  );
});
