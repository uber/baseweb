/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import {mount} from 'enzyme';
import {
  Popover,
  StyledBody,
  ACCESSIBILITY_TYPE,
  TRIGGER_TYPE,
} from '../index.js';

jest.useFakeTimers();

// Mock popper.js (see __mocks__ directory for impl)
jest.mock('popper.js');

// Mock React 16 portals in a way that makes them easy to test
const originalCreatePortal = ReactDOM.createPortal;

// Mock document.addEventListener
const originalDocumentAddListener = document.addEventListener;

describe('Popover', () => {
  let wrapper;

  beforeAll(() => {
    // $FlowFixMe
    document.addEventListener = jest.fn();
  });

  afterEach(() => {
    document.addEventListener.mockClear();
    wrapper && wrapper.unmount();
  });

  afterAll(() => {
    // $FlowFixMe
    ReactDOM.createPortal = originalCreatePortal;
    // $FlowFixMe
    document.addEventListener = originalDocumentAddListener;
  });

  test('basic click functionality', () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const content = <strong>Hello world</strong>;
    const button = <button type="button">Click me</button>;
    wrapper = mount(
      <Popover
        content={content}
        isOpen={false}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {button}
      </Popover>,
    );

    // Should render single button child to begin
    expect(wrapper.length).toBe(1);
    expect(wrapper).toHaveDisplayName('Popover');
    expect(wrapper).toHaveText('Click me');

    // Test click handling (and hover events ignored)
    wrapper.simulate('mouseenter');
    expect(onMouseEnter).not.toBeCalled();
    wrapper.simulate('click');
    expect(onClick).toBeCalled();

    // Show the popover
    wrapper.setProps({isOpen: true});

    // Should now have the portal as the second child
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.childAt(1)).toHaveDisplayName('Portal');
    const portal = wrapper.childAt(1);

    // Portal should have the popover body and content
    let popoverBody = portal.childAt(0);
    expect(popoverBody).toMatchSelector('[data-baseweb="popover"]');
    expect(popoverBody).toHaveProp({
      $showArrow: false,
      $placement: 'auto',
      $popoverOffset: {top: 0, left: 0},
      $arrowOffset: {top: 0, left: 0},
      $isAnimating: false,
      $isOpen: true,
    });
    const renderedContent = popoverBody.find('strong');
    expect(renderedContent).toExist();
    expect(renderedContent).toHaveText('Hello world');

    // Popper library should have been initialized
    expect(Popper).toHaveBeenCalled();

    // Manually emit a popper update (normally popper does this by itself)
    wrapper.instance().popper._callOnPopperUpdate();
    jest.runAllTimers();
    wrapper.update();

    popoverBody = wrapper.childAt(1).childAt(0);
    expect(popoverBody).toHaveProp({
      $placement: 'leftTop',
      $popoverOffset: {top: 10, left: 10},
      $arrowOffset: {top: 10, left: 10},
      $isAnimating: true,
      $isOpen: true,
    });
  });

  test('basic mouseenter/mouseleave functionality', () => {
    const onClickButton = jest.fn();
    const onClickPopover = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const content = <strong>Hello world</strong>;
    const button = (
      <button onClick={onClickButton} type="button">
        Click me
      </button>
    );
    wrapper = mount(
      <Popover
        content={content}
        isOpen={false}
        triggerType="hover"
        onClick={onClickPopover}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseLeaveDelay={200}
      >
        {button}
      </Popover>,
    );

    // Test click handling (and hover events ignored)
    const renderedButton = wrapper.childAt(0);
    expect(renderedButton).toHaveDisplayName('button');
    renderedButton.simulate('mouseenter');
    jest.runAllTimers();
    expect(onMouseEnter).toBeCalled();
    expect(onMouseLeave).not.toBeCalled();

    // Show the popover
    wrapper.setProps({isOpen: true});

    // Portal should have the popover body and content
    let popoverBody = wrapper.childAt(1).childAt(0);
    popoverBody.simulate('mouseleave');
    expect(onMouseLeave).not.toBeCalled();
    jest.runAllTimers();
    expect(onMouseLeave).toBeCalled();

    // Click should still work actually
    renderedButton.simulate('click');
    expect(onClickButton).toBeCalled();
    expect(onClickPopover).not.toBeCalled();
  });

  test('dismissOnEsc', () => {
    const onClick = jest.fn();
    const onEsc = jest.fn();
    const content = <strong>Hello world</strong>;
    const button = <button type="button">Click me</button>;
    wrapper = mount(
      <Popover isOpen content={content} onClick={onClick} onEsc={onEsc}>
        {button}
      </Popover>,
    );

    const calls = document.addEventListener.mock.calls;
    expect(calls[0][0]).toBe('mousedown');
    expect(calls[1][0]).toBe('keyup');

    calls[1][1]({
      key: 'Escape',
      code: 27,
      keyCode: 27,
    });

    expect(onEsc).toHaveBeenCalled();
  });

  test('text as anchor', () => {
    const onClick = jest.fn();
    const onEsc = jest.fn();
    const content = <strong>Hello world</strong>;
    wrapper = mount(
      <Popover isOpen content={content} onClick={onClick} onEsc={onEsc}>
        Hover me
      </Popover>,
    );

    const anchor = wrapper.childAt(0);
    expect(anchor).toHaveDisplayName('span');
    expect(anchor).toHaveText('Hover me');

    anchor.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('component as anchor', () => {
    const onClick = jest.fn();
    const content = <strong>Hello world</strong>;

    const CustomComponent = (jest.fn(): any);
    CustomComponent.mockReturnValue(<span>Hover Me</span>);

    wrapper = mount(
      <Popover isOpen content={content} onClick={onClick}>
        <CustomComponent />
      </Popover>,
    );

    // first render is prior to mount, second is after cdm
    expect(CustomComponent).toHaveBeenCalledTimes(2);
    expect(CustomComponent).toHaveBeenCalledWith(
      {
        $ref: wrapper.instance().anchorRef,
        onClick: wrapper.instance().onAnchorClick,
        'aria-controls': null,
        'aria-haspopup': 'true',
        'aria-expanded': 'true',
      },
      {},
    );
    expect(CustomComponent).toHaveBeenLastCalledWith(
      {
        $ref: wrapper.instance().anchorRef,
        onClick: wrapper.instance().onAnchorClick,
        'aria-controls': 'bui-mock-id',
        'aria-haspopup': 'true',
        'aria-expanded': 'true',
      },
      {},
    );
  });

  test('component overrides', () => {
    const overrides = {
      Arrow: jest.fn().mockImplementation(() => <div />),
      Body: jest.fn().mockImplementation(({children}) => <div>{children}</div>),
      Inner: jest
        .fn()
        .mockImplementation(({children}) => <div>{children}</div>),
    };

    wrapper = mount(
      // $FlowFixMe - Flow is complaining about jest mock args
      <Popover
        isOpen
        overrides={overrides}
        showArrow
        triggerType={TRIGGER_TYPE.hover}
      >
        Hover me
      </Popover>,
    );

    // eslint-disable-next-line flowtype/no-weak-types
    function withoutChildren(obj: any) {
      const shallowCopy = {...obj};
      delete shallowCopy.children;
      return shallowCopy;
    }

    const body = wrapper.find(overrides.Body);
    expect(body).toHaveLength(1);
    expect(withoutChildren(body.props())).toMatchSnapshot(
      'custom popover body has correct props',
    );

    const arrow = wrapper.find(overrides.Arrow);
    expect(arrow).toHaveLength(1);
    expect(withoutChildren(arrow.props())).toMatchSnapshot(
      'custom popover arrow has correct props',
    );

    const inner = wrapper.find(overrides.Inner);
    expect(inner).toHaveLength(1);
    expect(withoutChildren(inner.props())).toMatchSnapshot(
      'custom popover inner has correct props',
    );
  });

  test('click accessibility attributes', () => {
    const id = 'my-custom-popover';
    wrapper = mount(
      <Popover
        id={id}
        isOpen={false}
        content={<span>Hello</span>}
        accessibilityType={ACCESSIBILITY_TYPE.menu}
      >
        Click me
      </Popover>,
    );

    let anchor = wrapper.childAt(0);
    expect(anchor).toHaveProp({
      'aria-haspopup': 'true',
      'aria-expanded': 'false',
      'aria-controls': null,
    });

    wrapper.setProps({isOpen: true});

    anchor = wrapper.childAt(0);
    expect(anchor).toHaveProp({
      'aria-haspopup': 'true',
      'aria-expanded': 'true',
      'aria-controls': id,
    });

    const body = wrapper.find(StyledBody);
    expect(body).toHaveLength(1);
    expect(body).toHaveProp({
      id,
    });
  });

  test('hover accessibility attributes', () => {
    const id = 'my-custom-popover';
    wrapper = mount(
      <Popover
        id={id}
        isOpen={false}
        content={<span>Hello</span>}
        accessibilityType={ACCESSIBILITY_TYPE.menu}
        triggerType={TRIGGER_TYPE.hover}
      >
        Hover me
      </Popover>,
    );

    let anchor = wrapper.childAt(0);
    expect(anchor).toHaveProp({
      'aria-haspopup': 'true',
      'aria-expanded': 'false',
      'aria-owns': null,
    });

    wrapper.setProps({isOpen: true});

    anchor = wrapper.childAt(0);
    expect(anchor).toHaveProp({
      'aria-haspopup': 'true',
      'aria-expanded': 'true',
      'aria-owns': id,
    });

    const body = wrapper.find(StyledBody);
    expect(body).toHaveLength(1);
    expect(body).toHaveProp({
      id,
    });
  });

  test('tooltip accessibility attributes', () => {
    const id = 'my-custom-popover';
    wrapper = mount(
      <Popover
        id={id}
        isOpen={false}
        content={<span>Hello</span>}
        accessibilityType={ACCESSIBILITY_TYPE.tooltip}
        triggerType={TRIGGER_TYPE.hover}
      >
        Hover me
      </Popover>,
    );

    let anchor = wrapper.childAt(0);
    expect(anchor).toHaveProp({
      id: `${id}__anchor`,
      'aria-describedby': null,
    });

    wrapper.setProps({isOpen: true});

    anchor = wrapper.childAt(0);
    expect(anchor).toHaveProp({
      id: `${id}__anchor`,
      'aria-describedby': id,
    });

    const body = wrapper.find(StyledBody);
    expect(body).toHaveLength(1);
    expect(body).toHaveProp({
      id,
      role: 'tooltip',
    });
  });
});
