/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import ReactDOM from 'react-dom';
import {Layer, TetherBehavior} from '../../layer/index.js';
import {mount} from 'enzyme';
import {
  Popover,
  StyledBody,
  ACCESSIBILITY_TYPE,
  TRIGGER_TYPE,
} from '../index.js';

import {styled} from '../../styles/index.js';

jest.useFakeTimers();

// Mock Layer and TetherBehavior
let mockCount = 0;
jest.mock('../../layer/index.js', () => {
  return {
    Layer: jest.fn().mockImplementation(props => {
      if (props.onMount && !mockCount) {
        ++mockCount;
        props.onMount();
      }
      return props.children;
    }),
    TetherBehavior: jest.fn().mockImplementation(props => {
      return props.children;
    }),
  };
});

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
    mockCount = 0;
    // $FlowFixMe
    Layer.mockClear();
    // $FlowFixMe
    TetherBehavior.mockClear();
    document.addEventListener.mockClear();
    wrapper && wrapper.unmount();
  });

  afterAll(() => {
    // $FlowFixMe
    ReactDOM.createPortal = originalCreatePortal;
    // $FlowFixMe
    document.addEventListener = originalDocumentAddListener;
  });

  test('Popover - basic click functionality', () => {
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

    // Should now have the Layer as the second child
    expect(wrapper.children().length).toBe(2);

    wrapper.update();
    // Portal should have the popover body and content
    let popoverBody = wrapper.find('[data-baseweb="popover"]').first();
    expect(popoverBody).toExist();
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
    expect(popoverBody).toHaveText('Hello world');

    expect(Layer).toHaveBeenCalled();
    expect(TetherBehavior).toHaveBeenCalled();
    expect(TetherBehavior).toHaveBeenCalled();
    // $FlowFixMe
    const tetherProps = TetherBehavior.mock.calls[1][0];
    const wrapperInstance = wrapper.instance();
    expect(tetherProps).toMatchObject({
      popperOptions: {
        modifiers: {
          preventOverflow: {enabled: !wrapper.props().ignoreBoundary},
        },
      },
      onPopperUpdate: wrapperInstance.onPopperUpdate,
      placement: wrapper.state().placement,
    });

    expect(tetherProps.anchorRef).toBe(wrapperInstance.anchorRef.current);
    expect(tetherProps.arrowRef).toBe(wrapperInstance.arrowRef.current);
    expect(tetherProps.popperRef).toBe(wrapperInstance.popperRef.current);

    // // Manually emit a popper update (normally popper does this by itself)
    const offsets = {
      popper: {top: 10, left: 10},
      arrow: {top: 10, left: 10},
    };
    wrapper.instance().onPopperUpdate(offsets, {
      // $FlowFixMe
      offsets,
      placement: 'left-start',
    });
    jest.runAllTimers();
    wrapper.update();

    popoverBody = wrapper.find('[data-baseweb="popover"]').first();
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
    expect(document.addEventListener).toBeCalled();
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

    const CustomComponent = styled('span', {});
    // const CustomComponent = (jest.fn(): any);
    // CustomComponent.mockReturnValue(<span>Hover Me</span>);

    wrapper = mount(
      <Popover isOpen content={content} onClick={onClick}>
        <CustomComponent />
      </Popover>,
    );

    const childProps = wrapper.find('span').props();

    expect(childProps.onClick).toBe(wrapper.instance().onAnchorClick);
    expect(childProps['aria-controls']).toBe('bui-mock-id');
    expect(childProps['aria-haspopup']).toBe('true');
    expect(childProps['aria-expanded']).toBe('true');
    expect(wrapper).toMatchSnapshot();
  });

  test('component overrides', () => {
    const overrides = {
      Arrow: styled('div', {color: 'red'}),
      Body: styled('div', {color: 'green'}),
      Inner: styled('div', {color: 'blue'}),
    };

    wrapper = mount(
      <Popover
        isOpen
        overrides={overrides}
        showArrow
        triggerType={TRIGGER_TYPE.hover}
      >
        Hover me
      </Popover>,
    );

    const body = wrapper.find(overrides.Body);
    expect(body).toHaveLength(1);
    expect(body).toMatchSnapshot('custom popover body has correct props');

    const arrow = wrapper.find(overrides.Arrow);
    expect(arrow).toHaveLength(1);
    expect(arrow).toMatchSnapshot('custom popover arrow has correct props');

    const inner = wrapper.find(overrides.Inner);
    expect(inner).toHaveLength(1);
    expect(inner).toMatchSnapshot('custom popover inner has correct props');
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
