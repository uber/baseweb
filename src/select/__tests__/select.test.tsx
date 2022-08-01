/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
import * as React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';

import Select from '../select';
import { STATE_CHANGE_TYPE } from '../constants';
import { type ControlRef } from '..';

describe('Select component', function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any = {};
  const item = { id: 'id1', label: 'label1' };
  const options = [item, { id: 'id2', label: 'label2' }, { id: 'id3', label: 'bel3' }];

  beforeEach(function () {
    props = {
      options: options,
      onChange: jest.fn(),
      onInputChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
    };
  });

  it('calls onInputChange when input value changes', function () {
    const { container } = render(
      <TestBaseProvider>
        <Select {...props} />
      </TestBaseProvider>
    );

    const input = container.querySelector('input');
    if (input) fireEvent.change(input, { target: { value: 'test' } });
    expect(props.onInputChange).toHaveBeenCalledTimes(1);
  });

  it('removes selected tag on clear', function () {
    const { container } = render(
      <Select
        {...props}
        value={[item]}
        overrides={{ ClearIcon: { props: { 'data-testid': 'clear-icon' } } }}
      />
    );

    fireEvent.click(getByTestId(container, 'clear-icon'));
    expect(props.onChange).toHaveBeenCalled();
    expect(props.onChange.mock.calls[0][0]).toEqual({
      type: STATE_CHANGE_TYPE.clear,
      option: null,
      value: [],
    });
  });

  it('select flow allows custom keys in options objects', function () {
    const options = [
      { id: 'AliceBlue', color: '#F0F8FF' },
      { id: 'AntiqueWhite', color: '#FAEBD7' },
    ];
    const { container } = render(
      <TestBaseProvider>
        <Select
          options={options}
          labelKey="id"
          valueKey="color"
          overrides={{
            ControlContainer: { props: { 'data-testid': 'control-container' } },
          }}
        />
      </TestBaseProvider>
    );
    fireEvent.click(getByTestId(container, 'control-container'));
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe(options[0].id);
    expect(items[1].textContent).toBe(options[1].id);
  });

  it('sets controlRef from props', () => {
    function TestCase() {
      const ref = React.useRef() as ControlRef;
      React.useEffect(() => {
        if (ref.current) {
          ref.current.focus();
        }
      }, []);
      return <Select {...props} controlRef={ref} />;
    }
    const { container } = render(<TestCase />);
    expect(container.querySelector('input')).toBe(document.activeElement);
  });
});
