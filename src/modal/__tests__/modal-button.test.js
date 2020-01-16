/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {shallow} from 'enzyme';
import {ModalButton} from '../index.js';
import {Button, KIND} from '../../button/index.js';
import {LightTheme} from '../../themes/index.js';
import createMockTheme from '../../test/create-mock-theme.js';

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
      ':nth-last-child(n+2)': {
        marginRight: '$theme.sizing.scale500',
      },
    });
  });
});
