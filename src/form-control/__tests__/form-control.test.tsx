/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, getByTestId, getByText, queryByText } from '@testing-library/react';
import FormControl from '../form-control';
import { Input } from '../../input';
import { Textarea } from '../../textarea';
import { Checkbox } from '../../checkbox';
import { RadioGroup, Radio } from '../../radio';

describe('FormControl - Label and Caption for controls', () => {
  it('Renders label, caption, and error for the Input component', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const { container } = render(
      <FormControl label={label} caption={caption}>
        <Input />
      </FormControl>
    );
    getByText(container, label);
    getByText(container, caption);
  });

  it('renders error message if provided', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const error = 'Error test';
    const { container } = render(
      <FormControl label={label} caption={caption} error={error}>
        <Input />
      </FormControl>
    );
    expect(queryByText(container, caption)).toBeNull();
    getByText(container, error);
  });

  it('accepts node for label and caption', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const { container } = render(
      <FormControl label={<span>{label}</span>} caption={<span>{caption}</span>}>
        <Input />
      </FormControl>
    );
    getByText(container, label);
    getByText(container, caption);
  });

  it('accepts node for error', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const error = 'Error test';
    const { container } = render(
      <FormControl
        label={<span>{label}</span>}
        caption={<span>{caption}</span>}
        error={<span>{error}</span>}
      >
        <Input />
      </FormControl>
    );
    expect(queryByText(container, caption)).toBeNull();
    getByText(container, error);
  });

  it('Renders error if error and positive and caption are provided', () => {
    const consoleWarn = console.warn;
    // $FlowFixMe
    console.warn = jest.fn();

    const label = 'Label test';
    const caption = 'Caption test';
    const error = 'Error test';
    const positive = 'Positive test';
    const { container } = render(
      <FormControl
        label={<span>{label}</span>}
        caption={<span>{caption}</span>}
        error={<span>{error}</span>}
        positive={<span>{positive}</span>}
      >
        <Textarea />
      </FormControl>
    );
    expect(queryByText(container, caption)).toBeNull();
    expect(queryByText(container, positive)).toBeNull();
    getByText(container, error);

    // $FlowFixMe
    expect(console.warn.mock.calls.length).toBe(1);
    // $FlowFixMe
    console.warn = consoleWarn;
  });

  it('Renders label and caption for the Textarea component', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const { container } = render(
      <FormControl label="Label test" caption="Caption test">
        <Textarea required />
      </FormControl>
    );
    getByText(container, label);
    getByText(container, caption);
  });

  it('Renders label and caption for the Checkbox component', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const { container } = render(
      <FormControl label={label} caption={caption}>
        <Checkbox required />
      </FormControl>
    );
    getByText(container, label);
    getByText(container, caption);
  });

  it('Renders label and caption for the RadioGroup component', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const { container } = render(
      <FormControl label={label} caption={caption}>
        <RadioGroup required>
          <Radio value="1">First</Radio>
          <Radio value="2">Second</Radio>
          <Radio value="3">Third</Radio>
        </RadioGroup>
      </FormControl>
    );
    getByText(container, label);
    getByText(container, caption);
  });

  it('renders provided overrides', () => {
    const { container } = render(
      <FormControl
        overrides={{
          ControlContainer: { props: { 'data-testid': 'control-container' } },
          Label: { props: { 'data-testid': 'label' } },
          Caption: { props: { 'data-testid': 'caption' } },
        }}
        label="label"
        caption="caption"
      >
        <Input />
      </FormControl>
    );
    getByTestId(container, 'control-container');
    getByTestId(container, 'label');
    getByTestId(container, 'caption');
  });

  it('counter is visible', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const value = 'example';
    const maxLength = 50;

    const { container } = render(
      <FormControl label={label} caption={caption} counter>
        <Input value={value} maxLength={maxLength} />
      </FormControl>
    );

    getByText(container, label);
    getByText(container, caption);
    getByText(container, `${value.length}/${maxLength}`);
  });

  it('counter is zero', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const value = '';
    const maxLength = 50;

    const { container } = render(
      <FormControl label={label} caption={caption} counter>
        <Input value={value} maxLength={maxLength} />
      </FormControl>
    );

    getByText(container, label);
    getByText(container, caption);
    getByText(container, `${value.length}/${maxLength}`);
  });

  it('counter is hidden', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const value = 'example 2';
    const maxLength = 50;

    const { container } = render(
      <FormControl label={label} caption={caption}>
        <Input value={value} maxLength={maxLength} />
      </FormControl>
    );

    getByText(container, label);
    getByText(container, caption);
    expect(queryByText(container, `${value.length}/${maxLength}`)).toBeNull();
  });

  it('override counter', () => {
    const label = 'Label test';
    const caption = 'Caption test';
    const maxLength = 50;

    const { container } = render(
      <FormControl label={label} caption={caption} counter={{ length: 50, maxLength: 100 }}>
        <Input value={'example'} maxLength={maxLength} />
      </FormControl>
    );

    getByText(container, label);
    getByText(container, caption);
    getByText(container, '50/100');
  });
});
