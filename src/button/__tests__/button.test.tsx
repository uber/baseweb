/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';

import { Button } from '..';

describe('Button Component', () => {
  test('basic render', () => {
    const { container } = render(
      <Button startEnhancer="start" endEnhancer="end">
        content
      </Button>
    );
    getByText(container, 'start');
    getByText(container, 'end');
  });

  test('renders with components overrides', () => {
    function NewStartEnhancer() {
      return <p>start</p>;
    }

    const { container } = render(
      <Button startEnhancer={() => null} overrides={{ StartEnhancer: NewStartEnhancer }}>
        content
      </Button>
    );

    getByText(container, 'start');
  });

  test('renders with loading spinner', () => {
    const { container } = render(<Button isLoading />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  test('onClick called with event', () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick} />);
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("onClick doesn't fire while loading", () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick} isLoading />);
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(onClick.mock.calls.length).toBe(0);
  });

  test('simulate isLoading with google translate does not throw with element child', () => {
    const { rerender, container } = render(
      <Button isLoading={false}>
        <span id="text-content">This is ok</span>
      </Button>
    );
    // @ts-expect-error todo(ts-migration) TS2531 Object is possibly 'null'.
    container.querySelector('#text-content').innerHTML = '<font>This is not ok</font>';
    expect(() =>
      rerender(
        <Button isLoading={true}>
          <span>This is ok</span>
        </Button>
      )
    ).not.toThrow();
  });

  test('simulate google translate does not throw with string child', () => {
    const { rerender, container } = render(<Button>Lorem ipsum</Button>);
    // @ts-expect-error todo(ts-migration) TS2531 Object is possibly 'null'.
    container.querySelector('button').innerHTML = '<font>Hello world</font>';
    expect(() => rerender(<Button>Lorem ipsum</Button>)).not.toThrow();
  });

  test('simulate google translate does not throw with element child', () => {
    const { rerender, container } = render(
      <Button>
        <span id="text-content">This is ok</span>
      </Button>
    );
    // @ts-expect-error todo(ts-migration) TS2531 Object is possibly 'null'.
    container.querySelector('#text-content').innerHTML = '<font>This is not ok</font>';
    expect(() =>
      rerender(
        <Button>
          <span>This is ok</span>
        </Button>
      )
    ).not.toThrow();
  });
});
