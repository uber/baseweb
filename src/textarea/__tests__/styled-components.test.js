/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {TextareaContainer, Textarea} from '../styled-components.js';
import {SIZE} from '../../input/index.js';
describe('Textarea', () => {
  test('TextareaContainer - basic render', () => {
    const component = shallow(
      <TextareaContainer $size={SIZE.default}>
        <span />
      </TextareaContainer>,
    );
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct default styles',
    );
    component.setProps({
      $isFocused: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when focused',
    );
    component.setProps({
      $size: SIZE.compact,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when compact',
    );
    component.setProps({
      $error: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when error',
    );
    component.setProps({
      $disabled: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when disabled',
    );
  });

  test('Textarea element - basic render', () => {
    const component = shallow(<Textarea $size={SIZE.default} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'Textarea has correct default styles',
    );
    component.setProps({
      $size: SIZE.compact,
      $disabled: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'Textarea has correct styles when compact and disabled',
    );
  });
});
