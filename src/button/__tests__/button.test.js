/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {render, fireEvent, getByText} from '@testing-library/react';

import {Button} from '../index.js';

describe('Button Component', () => {
  test('basic render', () => {
    const {container} = render(
      <Button startEnhancer="start" endEnhancer="end">
        content
      </Button>,
    );
    getByText(container, 'start');
    getByText(container, 'end');
  });

  test('renders with components overrides', () => {
    function NewStartEnhancer() {
      return <p>start</p>;
    }

    const {container} = render(
      <Button
        startEnhancer={() => null}
        overrides={{StartEnhancer: NewStartEnhancer}}
      >
        content
      </Button>,
    );

    getByText(container, 'start');
  });

  test('renders with loading spinner', () => {
    const {container} = render(<Button isLoading />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  test('onClick called with event', () => {
    const onClick = jest.fn();
    const {container} = render(<Button onClick={onClick} />);
    fireEvent.click(container.querySelector('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("onClick doesn't fire while loading", () => {
    const onClick = jest.fn();
    const {container} = render(<Button onClick={onClick} isLoading />);
    fireEvent.click(container.querySelector('button'));
    expect(onClick.mock.calls.length).toBe(0);
  });

  test('simulate isLoading with google translate does not throw with string child', () => {
    const {rerender, container} = render(
      <Button isLoading={false}>This is not ok</Button>,
    );
    container.querySelector('button').innerHTML = '<span>This is not ok</span>';
    expect(() =>
      rerender(<Button isLoading={true}>This is not ok</Button>),
    ).not.toThrow();
  });

  test('simulate isLoading with google translate does not throw with element child', () => {
    const {rerender, container} = render(
      <Button isLoading={false}>
        <span>This is not ok</span>
      </Button>,
    );
    container.querySelector('button').innerHTML = '<span>This is not ok</span>';
    expect(() =>
      rerender(<Button isLoading={true}>This is not ok</Button>),
    ).not.toThrow();
  });
});
