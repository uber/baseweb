/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import BaseProvider from '../../helpers/base-provider.js';
import { LightTheme } from '../../themes/index.js';

import { StatefulSelect, Select } from '../index.js';
import type { ControlRefT } from '../types.js';

describe('setDropdownOpen', function () {
  it('opens and closes dropdown with StatefulSelect', () => {
    const options = [
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
      { id: 'c', label: 'c' },
    ];
    const controlRef: ControlRefT = React.createRef();

    const { container } = render(
      <BaseProvider theme={LightTheme}>
        <StatefulSelect controlRef={controlRef} options={options} />
      </BaseProvider>
    );

    expect(container.querySelectorAll('li').length).toBe(0);

    act(() => {
      controlRef.current && controlRef.current.setDropdownOpen(true);
    });
    expect(container.querySelectorAll('li').length).toBe(3);

    act(() => {
      controlRef.current && controlRef.current.setDropdownOpen(false);
    });
    expect(container.querySelectorAll('li').length).toBe(0);

    act(() => {
      controlRef.current && controlRef.current.setDropdownOpen(false);
    });
    expect(container.querySelectorAll('li').length).toBe(0);

    fireEvent.click(screen.getByText('Select...'));
    expect(container.querySelectorAll('li').length).toBe(3);

    act(() => {
      controlRef.current && controlRef.current.setDropdownOpen(false);
    });
    expect(container.querySelectorAll('li').length).toBe(0);
  });

  it('opens and closes dropdown with Select', () => {
    const options = [
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
      { id: 'c', label: 'c' },
    ];
    const controlRef = React.createRef();

    const TestCase = () => {
      const [value, setValue] = React.useState([]);

      return (
        <BaseProvider theme={LightTheme}>
          <Select
            value={value}
            onChange={(params) => setValue(params.value)}
            options={options}
            controlRef={controlRef}
          />
        </BaseProvider>
      );
    };

    const { container } = render(<TestCase />);

    expect(container.querySelectorAll('li').length).toBe(0);

    function setDropdownOpen(isOpen) {
      act(() => {
        if (controlRef.current !== null && controlRef.current.setDropdownOpen) {
          controlRef.current.setDropdownOpen(isOpen);
        }
      });
    }

    setDropdownOpen(true);
    expect(container.querySelectorAll('li').length).toBe(3);

    setDropdownOpen(false);
    expect(container.querySelectorAll('li').length).toBe(0);

    setDropdownOpen(false);
    expect(container.querySelectorAll('li').length).toBe(0);

    fireEvent.click(screen.getByText('Select...'));
    expect(container.querySelectorAll('li').length).toBe(3);

    setDropdownOpen(false);
    expect(container.querySelectorAll('li').length).toBe(0);
  });
});

describe('setInputValue', function () {
  it('correctly sets the input value', () => {
    const options = [
      { id: 'a', label: 'dragons' },
      { id: 'b', label: 'unicorns' },
      { id: 'c', label: 'elves' },
    ];
    const controlRef = React.createRef();

    const TestCase = () => {
      const [value, setValue] = React.useState([]);

      return (
        <BaseProvider theme={LightTheme}>
          <Select
            value={value}
            onChange={(params) => setValue(params.value)}
            options={options}
            controlRef={controlRef}
          />
        </BaseProvider>
      );
    };

    const { container } = render(<TestCase />);

    const input = container.querySelector('input');

    expect(input?.getAttribute('value')).toBe('');

    act(() => {
      if (controlRef.current) {
        controlRef.current.setInputValue('dragons');
      }
    });
    expect(input?.getAttribute('value')).toBe('dragons');

    act(() => {
      if (controlRef.current) {
        controlRef.current.setInputValue('item not included');
      }
    });
    expect(input?.getAttribute('value')).toBe('item not included');
  });
});
