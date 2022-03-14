/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { render, getByText } from '@testing-library/react';

import SelectDropdown from '../dropdown.js';
import { SIZE, TYPE } from '../constants.js';
import type { ReactRefT } from '../types.js';

const options = [
  { id: '1', label: 'label1' },
  { id: '2', label: 'label2' },
];
const value = [options[1]];

describe('SelectDropdown', function () {
  it('renders provided options', () => {
    function TestCase() {
      const ref: ReactRefT<HTMLElement> = React.createRef<HTMLElement>();
      const props = {
        value,
        valueKey: 'id',
        labelKey: 'label',
        size: SIZE.default,
        options,
        onItemSelect: jest.fn(),
        getOptionLabel: jest.fn(({ option }) => <span>{option.label}</span>),
        maxDropdownHeight: '1000px',
        overrides: {},
        error: false,
        isLoading: false,
        multi: false,
        required: false,
        searchable: true,
        type: TYPE.select,
        width: 100,
        innerRef: ref,
      };

      return <SelectDropdown {...props} />;
    }
    const { container } = render(<TestCase />);
    getByText(container, options[0].label);
    getByText(container, options[1].label);

    const items = container.querySelectorAll('li');
    expect(items[0].getAttribute('aria-selected')).toBe('false');
    expect(items[1].getAttribute('aria-selected')).toBe('true');
  });

  it('renders default highlighted option', () => {
    function TestCase() {
      const ref: ReactRefT<HTMLElement> = React.createRef<HTMLElement>();
      const props = {
        value: [],
        valueKey: 'id',
        labelKey: 'label',
        size: SIZE.default,
        options,
        onItemSelect: jest.fn(),
        getOptionLabel: jest.fn(({ option }) => <span>{option.label}</span>),
        maxDropdownHeight: '1000px',
        overrides: {},
        error: false,
        isLoading: false,
        multi: false,
        required: false,
        searchable: true,
        type: TYPE.select,
        width: 100,
        innerRef: ref,
      };

      return <SelectDropdown {...props} />;
    }
    const { container } = render(<TestCase />);
    getByText(container, options[0].label);
    getByText(container, options[1].label);

    const items = container.querySelectorAll('li');
    expect(items[0].getAttribute('aria-selected')).toBe('true');
    expect(items[1].getAttribute('aria-selected')).toBe('false');
  });
});
