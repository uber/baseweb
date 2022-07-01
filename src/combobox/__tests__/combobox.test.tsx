/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils.js';

import { Combobox } from '../index.js';

const options = ['A', 'B', 'C', 'D', 'E', 'F'];

describe('combobox', () => {
  it('calls onChange when text is entered', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={handleChange}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'x' } });
    }

    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange.mock.calls[0][0]).toBe('x');
    expect(handleChange.mock.calls[0][1]).toBe(null);
  });

  it('calls onBlur when input loses focus', () => {
    const handleBlur = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onBlur={handleBlur}
          onChange={() => {}}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'x' } });
      fireEvent.blur(input);
    }
    expect(handleBlur.mock.calls.length).toBe(1);
  });

  it('calls onFocus when input enters focus', () => {
    const handleFocus = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={() => {}}
          onFocus={handleFocus}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'x' } });
      fireEvent.focus(input);
    }
    expect(handleFocus.mock.calls.length).toBe(1);
  });

  it('opens listbox when text is entered', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox mapOptionToString={(o) => o} onChange={() => {}} options={options} value={''} />
      </TestBaseProvider>
    );
    const before = container.querySelector('ul');
    expect(before).toBeNull();

    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'x' } });
    }
    const after = container.querySelector('ul');
    expect(after).not.toBeNull();
  });

  it('opens listbox when arrow down is pressed', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox mapOptionToString={(o) => o} onChange={() => {}} options={options} value={''} />
      </TestBaseProvider>
    );
    const before = container.querySelector('ul');
    expect(before).toBeNull();

    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
    }
    const after = container.querySelector('ul');
    expect(after).not.toBeNull();
  });

  it('does not call onChange selection changes', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={handleChange}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
    }
    expect(handleChange.mock.calls.length).toBe(0);
  });

  it('calls onChange with selected value when enter key pressed', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={handleChange}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 13 });
    }
    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange.mock.calls[0][0]).toBe(options[1]);
    expect(handleChange.mock.calls[0][1]).toBe(options[1]);
  });

  it('calls onChange with selected value when option clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={handleChange}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
    }
    const selectedItem = container.querySelector('li[aria-selected="true"]');
    if (selectedItem) {
      fireEvent.click(selectedItem);
    }
    expect(handleChange.mock.calls.length).toBe(1);
    expect(handleChange.mock.calls[0][0]).toBe(options[2]);
    expect(handleChange.mock.calls[0][1]).toBe(options[2]);
  });

  it('opens listbox on focus', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox mapOptionToString={(o) => o} onChange={() => {}} options={options} value={''} />
      </TestBaseProvider>
    );
    const initial = container.querySelector('ul');
    expect(initial).toBeNull();

    const input = container.querySelector('input');
    if (input) {
      fireEvent.focus(input);
    }
    const open = container.querySelector('ul');
    expect(open).not.toBeNull();
  });

  it('does not open listbox on focus if no options', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox mapOptionToString={(o) => o} onChange={() => {}} options={[]} value={''} />
      </TestBaseProvider>
    );
    const initial = container.querySelector('ul');
    expect(initial).toBeNull();

    const input = container.querySelector('input');
    if (input) {
      fireEvent.focus(input);
    }
    const closed = container.querySelector('ul');
    expect(closed).toBeNull();
  });

  it('closes listbox on option click', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox mapOptionToString={(o) => o} onChange={() => {}} options={options} value={''} />
      </TestBaseProvider>
    );
    const initial = container.querySelector('ul');
    expect(initial).toBeNull();

    const input = container.querySelector('input');
    if (input) {
      fireEvent.focus(input);
    }
    const open = container.querySelector('ul');
    expect(open).not.toBeNull();

    const option = container.querySelector('li');
    if (option) {
      fireEvent.click(option);
    }
    const closed = container.querySelector('ul');
    expect(closed).toBeNull();
  });

  it('closes listbox on blur', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox mapOptionToString={(o) => o} onChange={() => {}} options={options} value={''} />
      </TestBaseProvider>
    );
    const initial = container.querySelector('ul');
    expect(initial).toBeNull();

    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
    }
    const open = container.querySelector('ul');
    expect(open).not.toBeNull();

    if (input) {
      fireEvent.blur(input, {});
    }
    const closed = container.querySelector('ul');
    expect(closed).toBeNull();
  });

  it('clears input on value state set to empty string', () => {
    function TestCase() {
      const [value, setValue] = React.useState('');
      return (
        <TestBaseProvider>
          <Combobox
            mapOptionToString={(o) => o}
            onChange={(v) => setValue(v)}
            options={options}
            value={value}
          />
          <button onClick={() => setValue('')}>clear</button>
        </TestBaseProvider>
      );
    }
    const { container } = render(<TestCase />);

    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 13 });
    }
    expect(input?.getAttribute('value')).toBe(options[1]);

    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(input?.getAttribute('value')).toBe('');
  });

  it('clears input on value state set to arbitrary string', () => {
    let updateValue = 'abc';
    function TestCase() {
      const [value, setValue] = React.useState('');
      return (
        <TestBaseProvider>
          <Combobox
            mapOptionToString={(o) => o}
            onChange={(v) => setValue(v)}
            options={options}
            value={value}
          />
          <button onClick={() => setValue(updateValue)}>update</button>
        </TestBaseProvider>
      );
    }
    const { container } = render(<TestCase />);

    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 13 });
    }
    expect(input?.getAttribute('value')).toBe(options[1]);

    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(input?.getAttribute('value')).toBe(updateValue);
  });

  it('does not change input value while keyboard nav if autocomplete is false', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          autocomplete={false}
          mapOptionToString={(o) => o}
          onChange={() => {}}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.keyDown(input, { keyCode: 40 });
    }
    expect(input?.getAttribute('value')).toBe('');
  });

  it('can close listbox on submission', () => {
    const { container } = render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={() => {}}
          onSubmit={({ closeListbox }) => closeListbox()}
          options={options}
          value={''}
        />
      </TestBaseProvider>
    );

    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'x' } });
    }
    const open = container.querySelector('ul');
    expect(open).not.toBeNull();

    if (input) {
      fireEvent.keyDown(input, { keyCode: 13 });
    }
    const closed = container.querySelector('ul');
    expect(closed).toBeNull();
  });

  it('forwards inputRef from props', () => {
    const inputRef = React.createRef();
    let isFocused = false;
    const onFocus = () => {
      isFocused = true;
    };
    render(
      <TestBaseProvider>
        <Combobox
          mapOptionToString={(o) => o}
          onChange={() => {}}
          options={options}
          value={''}
          inputRef={inputRef}
          onFocus={onFocus}
        />
      </TestBaseProvider>
    );

    expect(inputRef.current).toBeDefined();
    act(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
    expect(isFocused).toBeTruthy();
  });
});
