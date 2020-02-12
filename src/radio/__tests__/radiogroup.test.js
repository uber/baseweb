/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import {StatefulRadioGroup, RadioGroup, Radio} from '../index.js';

describe('radio-group', () => {
  it('sets expected child radio checked', () => {
    const wrapper = shallow(
      <RadioGroup value="3">
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" />
      </RadioGroup>,
    );

    wrapper.children().forEach((child, index) => {
      expect(child).toHaveProp('checked', index === 2);
    });
  });

  it('disables children if disabled', () => {
    const wrapper = shallow(
      <RadioGroup disabled>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );

    wrapper.children().forEach(child => {
      expect(child).toHaveProp('disabled', true);
    });
  });

  it('disabled prop on children take priority', () => {
    const wrapper = shallow(
      <RadioGroup disabled={false}>
        <Radio disabled />
        <Radio />
        <Radio />
      </RadioGroup>,
    );

    wrapper.children().forEach((child, index) => {
      expect(child).toHaveProp('disabled', index === 0);
    });
  });
});

describe('radio-group focus and a11y management', () => {
  it('sets the initial state', () => {
    const {getByDisplayValue} = render(
      <RadioGroup name="numbers" value="3">
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" />
      </RadioGroup>,
    );
    expect(getByDisplayValue('1')).not.toBeChecked();
    expect(getByDisplayValue('2')).not.toBeChecked();
    expect(getByDisplayValue('3')).toBeChecked();

    expect(getByDisplayValue('1')).toHaveAttribute('tabindex', '-1');
    expect(getByDisplayValue('2')).toHaveAttribute('tabindex', '-1');
    expect(getByDisplayValue('3')).toHaveAttribute('tabindex', '0');

    expect(getByDisplayValue('1')).not.toHaveFocus();
    expect(getByDisplayValue('2')).not.toHaveFocus();
    expect(getByDisplayValue('3')).not.toHaveFocus();
  });

  it('hits tab', () => {
    const {getByDisplayValue, container} = render(
      <StatefulRadioGroup name="numbersz" initialState={{value: '3'}}>
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" />
      </StatefulRadioGroup>,
    );

    const one = getByDisplayValue('1');
    const two = getByDisplayValue('2');
    const three = getByDisplayValue('3');

    userEvent.tab();

    fireEvent(
      getByDisplayValue('2'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    // getByDisplayValue('3').focus();
    // fireEvent(
    //   getByDisplayValue('3'),
    //   new KeyboardEvent('keydown', {
    //     key: 'ArrowUp',
    //     code: 'ArrowUp',
    //     keyCode: 38,
    //     charCode: 38,
    //   }),
    // );
    // fireEvent.keyDown(container, {key: 'ArrowUp', code: 38});
    // fireEvent.keyDown(three, {key: 'ArrowUp', code: 38});
    // fireEvent.keyDown(document.body, {key: 'ArrowUp', code: 38});

    // expect(one).not.toHaveFocus();
    // expect(two).toHaveFocus();
    // expect(three).not.toHaveFocus();

    expect(getByDisplayValue('1')).not.toBeChecked();
    expect(getByDisplayValue('2')).toBeChecked();
    expect(getByDisplayValue('3')).not.toBeChecked();

    expect(getByDisplayValue('1')).toHaveAttribute('tabindex', '-1');
    expect(getByDisplayValue('2')).toHaveAttribute('tabindex', '0');
    expect(getByDisplayValue('3')).toHaveAttribute('tabindex', '-1');
  });
});
