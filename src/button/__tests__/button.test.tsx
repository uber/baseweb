/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { flushSync } from 'react-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button, MIN_HIT_AREA } from '..';

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

describe('Link Button', () => {
  test('renders as an anchor tag with href', () => {
    const { container } = render(<Button href="https://example.com">content</Button>);
    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('href', 'https://example.com');
  });

  test('click event on anchor tag', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button href="https://example.com" onClick={onClick}>
        content
      </Button>
    );
    const anchor = container.querySelector('a');
    if (anchor) fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders as an anchor tag with href and target', () => {
    const { container } = render(
      <Button href="https://example.com" target="_blank">
        content
      </Button>
    );
    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(anchor).toHaveAttribute('target', '_blank');
  });

  test('renders with href, target and other props', () => {
    const { container } = render(
      <Button href="https://example.com" target="_blank" startEnhancer="start" endEnhancer="end">
        content
      </Button>
    );
    const anchor = container.querySelector('a');
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(anchor).toHaveAttribute('target', '_blank');
    getByText(container, 'start');
    getByText(container, 'end');
  });

  test('onClick overrides default href behavior', () => {
    const onClick = jest.fn((event) => event.preventDefault());
    const { container } = render(
      <Button href="https://example.com" onClick={onClick}>
        content
      </Button>
    );
    const anchor = container.querySelector('a');
    if (anchor) fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders only an anchor tag', () => {
    const { container } = render(<Button href="https://example.com">content</Button>);
    const allElements = container.firstChild?.childNodes;
    expect(allElements).toHaveLength(1);
    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.childNodes).toHaveLength(1);
    expect(anchor?.firstChild?.nodeType).toBe(Node.TEXT_NODE);
    expect(anchor?.textContent).toBe('content');
  });
});

describe('Button Mouse Events', () => {
  test('handles mouse enter and leave events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { container } = render(
      <Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        Hover me
      </Button>
    );

    const button = container.querySelector('button');
    expect(button).not.toBeNull();

    if (button) {
      flushSync(() => {
        fireEvent.mouseEnter(button);
      });
      expect(onMouseEnter).toHaveBeenCalledTimes(1);

      flushSync(() => {
        fireEvent.mouseLeave(button);
      });
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    }
  });

  test('handles mouse down and up events', () => {
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();

    const { container } = render(
      <Button onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        Click me
      </Button>
    );

    const button = container.querySelector('button');
    expect(button).not.toBeNull();

    if (button) {
      flushSync(() => {
        fireEvent.mouseDown(button);
      });
      expect(onMouseDown).toHaveBeenCalledTimes(1);

      flushSync(() => {
        fireEvent.mouseUp(button);
      });
      expect(onMouseUp).toHaveBeenCalledTimes(1);
    }
  });

  test('handles mouse over and out events', () => {
    const onMouseOver = jest.fn();
    const onMouseOut = jest.fn();

    const { container } = render(
      <Button onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        Hover over me
      </Button>
    );

    const button = container.querySelector('button');
    expect(button).not.toBeNull();

    if (button) {
      flushSync(() => {
        fireEvent.mouseOver(button);
      });
      expect(onMouseOver).toHaveBeenCalledTimes(1);

      flushSync(() => {
        fireEvent.mouseOut(button);
      });
      expect(onMouseOut).toHaveBeenCalledTimes(1);
    }
  });
});

describe('Button minHitArea', () => {
  test('tap minHitArea accepts clicks', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button minHitArea={MIN_HIT_AREA.tap} onClick={onClick}>
        Tap Button
      </Button>
    );
    const button = container.querySelector('button');

    if (button) fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('click minHitArea accepts clicks', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button minHitArea={MIN_HIT_AREA.click} onClick={onClick}>
        Click Button
      </Button>
    );
    const button = container.querySelector('button');

    if (button) fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
