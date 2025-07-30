/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { Stepper } from '../stepper';

describe('Stepper', () => {
  test('Should increment value when clicking increment button', () => {
    function TestCase() {
      const [value, setValue] = React.useState(0);
      return <Stepper value={value} setValue={setValue} />;
    }

    render(<TestCase />);
    const incrementButton = screen.getByLabelText('increment value');
    const input = screen.getByLabelText('value') as HTMLInputElement;

    expect(input.value).toBe('0');
    fireEvent.click(incrementButton);
    expect(input.value).toBe('1');
  });

  test('Should decrement value when clicking decrement button', () => {
    function TestCase() {
      const [value, setValue] = React.useState(1);
      return <Stepper value={value} setValue={setValue} />;
    }

    render(<TestCase />);
    const decrementButton = screen.getByLabelText('decrement value');
    const input = screen.getByLabelText('value') as HTMLInputElement;

    expect(input.value).toBe('1');
    fireEvent.click(decrementButton);
    expect(input.value).toBe('0');
  });

  test('Should respect step prop when incrementing/decrementing', () => {
    function TestCase() {
      const [value, setValue] = React.useState(0);
      return <Stepper value={value} setValue={setValue} step={2} />;
    }

    render(<TestCase />);
    const incrementButton = screen.getByLabelText('increment value');
    const decrementButton = screen.getByLabelText('decrement value');
    const input = screen.getByLabelText('value') as HTMLInputElement;

    expect(input.value).toBe('0');
    fireEvent.click(incrementButton);
    expect(input.value).toBe('2');
    fireEvent.click(decrementButton);
    expect(input.value).toBe('0');
  });

  test('Should handle decimal step values', () => {
    function TestCase() {
      const [value, setValue] = React.useState(0);
      return <Stepper value={value} setValue={setValue} step={0.1} />;
    }

    render(<TestCase />);
    const incrementButton = screen.getByLabelText('increment value');
    const decrementButton = screen.getByLabelText('decrement value');
    const input = screen.getByLabelText('value') as HTMLInputElement;

    expect(input.value).toBe('0');
    fireEvent.click(incrementButton);
    expect(input.value).toBe('0.1');
    fireEvent.click(incrementButton);
    expect(input.value).toBe('0.2');
    fireEvent.click(decrementButton);
    expect(input.value).toBe('0.1');
    fireEvent.click(decrementButton);
    expect(input.value).toBe('0');
  });

  test('Should respect minValue and maxValue props', () => {
    function TestCase() {
      const [value, setValue] = React.useState(5);
      return <Stepper value={value} setValue={setValue} minValue={5} maxValue={7} />;
    }

    render(<TestCase />);
    const incrementButton = screen.getByLabelText('increment value');
    const decrementButton = screen.getByLabelText('decrement value');
    const input = screen.getByLabelText('value') as HTMLInputElement;

    expect(input.value).toBe('5');
    fireEvent.click(decrementButton);
    expect(input.value).toBe('5'); // Should not go below minValue

    fireEvent.click(incrementButton);
    expect(input.value).toBe('6');
    fireEvent.click(incrementButton);
    expect(input.value).toBe('7');
    fireEvent.click(incrementButton);
    expect(input.value).toBe('7'); // Should not go above maxValue
  });
});
