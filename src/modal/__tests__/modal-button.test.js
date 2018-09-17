/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import React from 'react';
import {shallow} from 'enzyme';
import {ModalButton} from '../index';
import {Button, KIND} from '../../button';
import {LightTheme} from '../../themes';
import createMockTheme from '../../test/create-mock-theme';

const mockTheme = createMockTheme(LightTheme);

describe('ModalButton', () => {
  test('renders modal button with correct styles', () => {
    const overrides = {BaseButton: {style: {color: 'red'}}};
    const wrapper = shallow(
      <ModalButton kind={KIND.tertiary} overrides={overrides}>
        Hello World
      </ModalButton>,
    );

    const button = wrapper.find(Button);
    expect(button).toExist();
    expect(button).toHaveProp('kind', KIND.tertiary);

    const mergedOverrides = button.prop('overrides');
    const result = mergedOverrides.BaseButton.style({$theme: mockTheme});
    expect(result).toEqual({
      color: 'red',
      marginLeft: '$theme.sizing.scale500',
    });
  });
});
