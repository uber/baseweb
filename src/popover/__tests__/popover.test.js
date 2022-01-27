/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {
  render,
  fireEvent,
  findByText,
  getByText,
  getByRole,
  queryByText,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import {TestBaseProvider} from '../../test/test-utils.js';
import {Popover, ACCESSIBILITY_TYPE, TRIGGER_TYPE} from '../index.js';

import {styled} from '../../styles/index.js';
import * as reactuid from 'react-uid';

describe('Popover', () => {
  beforeAll(() => {
    jest.spyOn(reactuid, 'useUID').mockImplementation(() => 'bui-mock-id');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('handles clicks', () => {
    const content = 'content';
    const anchorContent = 'click';

    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Popover
            content={content}
            isOpen={open}
            onClick={() => setOpen(true)}
          >
            <button type="button">{anchorContent}</button>
          </Popover>
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);
    expect(queryByText(container, content)).toBeNull();

    fireEvent.click(getByText(container, anchorContent));
    expect(queryByText(container, content)).not.toBeNull();
  });

  it('handles mouse enter/leave', async () => {
    const content = 'content';
    const anchorContent = 'hover';

    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Popover
            content={content}
            isOpen={open}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            triggerType={TRIGGER_TYPE.hover}
          >
            <button>{anchorContent}</button>
          </Popover>
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);
    expect(queryByText(container, content)).toBeNull();

    fireEvent.pointerEnter(getByText(container, anchorContent));
    await findByText(container, content);

    fireEvent.pointerLeave(getByText(container, anchorContent));
    await waitForElementToBeRemoved(() => getByText(container, content));
  });

  it('autoFocus and returnFocus', async () => {
    const buttonId = 'foo';
    const firstInputId = 'bar';
    const contentContent = 'content';
    const anchorContent = 'anchor';
    const content = (
      <div>
        <input id={firstInputId} />
        <input id="baz" />
        {contentContent}
      </div>
    );
    const FocusMe = React.forwardRef((props, ref) => {
      const el = React.useRef(null);
      React.useEffect(() => {
        el.current && el.current.focus();
      });
      return (
        <div ref={ref}>
          <button {...props} id={buttonId} ref={el} type="button">
            {anchorContent}
          </button>
        </div>
      );
    });
    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Popover
            focusLock
            content={content}
            isOpen={open}
            onClick={() => setOpen(prev => !prev)}
          >
            <FocusMe />
          </Popover>
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);

    fireEvent.click(getByText(container, anchorContent));
    await findByText(container, contentContent);
    expect((document.activeElement: any).id).toEqual(firstInputId);

    fireEvent.click(getByText(container, anchorContent));
    expect(document.activeElement).not.toBeNull();
    expect((document.activeElement: any).id).toEqual(buttonId);
  });

  it('text as anchor', () => {
    const onClick = jest.fn();
    const onEsc = jest.fn();
    const content = <strong>Hello world</strong>;
    const anchorContent = 'hover';
    const {container} = render(
      <TestBaseProvider>
        <Popover isOpen content={content} onClick={onClick} onEsc={onEsc}>
          {anchorContent}
        </Popover>
      </TestBaseProvider>,
    );
    const anchor = getByText(container, anchorContent);
    expect(anchor.tagName).toBe('SPAN');
    fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('component as anchor', () => {
    const onClick = jest.fn();
    const content = <strong>Hello world</strong>;
    const anchorContent = 'hover';
    const CustomComponent = styled('span', {});
    const {container} = render(
      <TestBaseProvider>
        <Popover isOpen content={content} onClick={onClick}>
          <CustomComponent>{anchorContent}</CustomComponent>
        </Popover>
      </TestBaseProvider>,
    );
    const anchor = getByText(container, anchorContent);
    expect(anchor.tagName).toBe('SPAN');
    expect(anchor.getAttribute('aria-controls')).toBe('bui-mock-id');
    expect(anchor.getAttribute('aria-haspopup')).toBe('true');
    expect(anchor.getAttribute('aria-expanded')).toBe('true');
  });

  it('click accessibility attributes', () => {
    const id = 'my-custom-popover';
    const anchorContent = 'hover';
    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Popover
            id={id}
            isOpen={open}
            content={<span>Hello</span>}
            accessibilityType={ACCESSIBILITY_TYPE.menu}
            onClick={() => setOpen(true)}
          >
            {anchorContent}
          </Popover>
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);
    const anchor = getByText(container, anchorContent);
    expect(anchor.getAttribute('aria-haspopup')).toBe('true');
    expect(anchor.getAttribute('aria-expanded')).toBe('false');
    expect(anchor.getAttribute('aria-controls')).toBe(null);
    fireEvent.click(anchor);

    expect(anchor.getAttribute('aria-haspopup')).toBe('true');
    expect(anchor.getAttribute('aria-expanded')).toBe('true');
    expect(anchor.getAttribute('aria-controls')).toBe(id);
  });

  it('hover accessibility attributes', async () => {
    const id = 'my-custom-popover';
    const content = 'content';
    const anchorContent = 'hover';
    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Popover
            id={id}
            isOpen={open}
            content={<span>{content}</span>}
            accessibilityType={ACCESSIBILITY_TYPE.menu}
            triggerType={TRIGGER_TYPE.hover}
            onMouseEnter={() => setOpen(true)}
          >
            {anchorContent}
          </Popover>
        </TestBaseProvider>
      );
    }
    const {container} = render(<TestCase />);
    const anchor = getByText(container, anchorContent);
    expect(anchor.getAttribute('aria-haspopup')).toBe('true');
    expect(anchor.getAttribute('aria-expanded')).toBe('false');
    expect(anchor.getAttribute('aria-owns')).toBe(null);
    fireEvent.pointerEnter(anchor);

    await findByText(container, content);
    expect(anchor.getAttribute('aria-haspopup')).toBe('true');
    expect(anchor.getAttribute('aria-expanded')).toBe('true');
    expect(anchor.getAttribute('aria-owns')).toBe(id);
  });

  it('tooltip accessibility attributes', async () => {
    const id = 'my-custom-popover';
    const content = 'content';
    const anchorContent = 'hover';
    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Popover
            id={id}
            isOpen={open}
            content={<span>{content}</span>}
            accessibilityType={ACCESSIBILITY_TYPE.tooltip}
            triggerType={TRIGGER_TYPE.hover}
            onMouseEnter={() => setOpen(true)}
          >
            {anchorContent}
          </Popover>
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);

    const anchor = getByText(container, anchorContent);
    expect(anchor.getAttribute('id')).toBe(`${id}__anchor`);
    expect(anchor.getAttribute('aria-describedby')).toBe(null);

    fireEvent.pointerEnter(anchor);
    await findByText(container, content);
    expect(anchor.getAttribute('aria-describedby')).toBe(id);

    const body = getByRole(container, 'tooltip');
    expect(body.getAttribute('id')).toBe(id);
  });
});
