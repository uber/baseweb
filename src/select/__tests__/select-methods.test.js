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
import type { MethodsRefT } from '../types.js';

describe('setDropdownOpen', function () {
  it('opens and closes dropdown with StatefulSelect', () => {
    const options = [
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
      { id: 'c', label: 'c' },
    ];
    const methodsRef: MethodsRefT = React.createRef();

    const { container } = render(
      <BaseProvider theme={LightTheme}>
        <StatefulSelect methodsRef={methodsRef} options={options} />
      </BaseProvider>
    );

    expect(container.querySelectorAll('li').length).toBe(0);

    act(() => {
      methodsRef.current && methodsRef.current.setDropdownOpen(true);
    });
    expect(container.querySelectorAll('li').length).toBe(3);

    act(() => {
      methodsRef.current && methodsRef.current.setDropdownOpen(false);
    });
    expect(container.querySelectorAll('li').length).toBe(0);

    act(() => {
      methodsRef.current && methodsRef.current.setDropdownOpen(false);
    });
    expect(container.querySelectorAll('li').length).toBe(0);

    fireEvent.click(screen.getByText('Select...'));
    expect(container.querySelectorAll('li').length).toBe(3);

    act(() => {
      methodsRef.current && methodsRef.current.setDropdownOpen(false);
    });
    expect(container.querySelectorAll('li').length).toBe(0);
  });

  it('opens and closes dropdown with Select', () => {
    const options = [
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
      { id: 'c', label: 'c' },
    ];
    const methodsRef = React.createRef();

    const TestCase = () => {
      const [value, setValue] = React.useState([]);

      return (
        <BaseProvider theme={LightTheme}>
          <Select
            value={value}
            onChange={(params) => setValue(params.value)}
            options={options}
            methodsRef={methodsRef}
          />
        </BaseProvider>
      );
    };

    const { container } = render(<TestCase />);

    expect(container.querySelectorAll('li').length).toBe(0);

    function setDropdownOpen(isOpen) {
      act(() => {
        if (methodsRef.current !== null && methodsRef.current.setDropdownOpen) {
          methodsRef.current.setDropdownOpen(isOpen);
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
