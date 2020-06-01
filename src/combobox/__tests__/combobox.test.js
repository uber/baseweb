/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {Combobox} from '../index.js';

const options = ['A', 'B', 'C', 'D', 'E', 'F'];

describe('combobox', () => {
  it('calls onChange when text is entered', () => {
    const handleChange = jest.fn();
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={handleChange}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const input = container.querySelector('input');
    fireEvent.change(input, {target: {value: 'x'}});

    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange.mock.calls[0][0]).toBe('x');
    expect(handleChange.mock.calls[0][1]).toBe(null);
  });

  it('opens listbox when text is entered', () => {
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={() => {}}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const before = container.querySelector('ul');
    expect(before).toBeNull();

    const input = container.querySelector('input');
    fireEvent.change(input, {target: {value: 'x'}});

    const after = container.querySelector('ul');
    expect(after).not.toBeNull();
  });

  it('opens listbox when arrow down is pressed', () => {
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={() => {}}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const before = container.querySelector('ul');
    expect(before).toBeNull();

    const input = container.querySelector('input');
    fireEvent.keyDown(input, {keyCode: 40});

    const after = container.querySelector('ul');
    expect(after).not.toBeNull();
  });

  it('does not call onChange selection changes', () => {
    const handleChange = jest.fn();
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={handleChange}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const input = container.querySelector('input');
    fireEvent.keyDown(input, {keyCode: 40});
    fireEvent.keyDown(input, {keyCode: 40});
    fireEvent.keyDown(input, {keyCode: 40});

    expect(handleChange.mock.calls.length).toBe(0);
  });

  it('calls onChange with selected value when enter key pressed', () => {
    const handleChange = jest.fn();
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={handleChange}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const input = container.querySelector('input');
    fireEvent.keyDown(input, {keyCode: 40});
    fireEvent.keyDown(input, {keyCode: 40});
    fireEvent.keyDown(input, {keyCode: 13});

    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange.mock.calls[0][0]).toBe(options[1]);
    expect(handleChange.mock.calls[0][1]).toBe(options[1]);
  });

  it('calls onChange with selected value when option clicked', () => {
    const handleChange = jest.fn();
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={handleChange}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const input = container.querySelector('input');
    fireEvent.keyDown(input, {keyCode: 40});
    fireEvent.keyDown(input, {keyCode: 40});
    fireEvent.keyDown(input, {keyCode: 40});

    const selectedItem = container.querySelector('li[aria-selected="true"]');
    fireEvent.click(selectedItem);

    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange.mock.calls[0][0]).toBe(options[2]);
    expect(handleChange.mock.calls[0][1]).toBe(options[2]);
  });

  it('closes listbox on blur', () => {
    const {container} = render(
      <Combobox
        mapOptionToString={o => o}
        onChange={() => {}}
        options={options}
        value={''}
      />,
      {container: document.body},
    );
    const initial = container.querySelector('ul');
    expect(initial).toBeNull();

    const input = container.querySelector('input');
    fireEvent.keyDown(input, {keyCode: 40});

    const open = container.querySelector('ul');
    expect(open).not.toBeNull();

    fireEvent.blur(input, {});

    const closed = container.querySelector('ul');
    expect(closed).toBeNull();
  });
});
