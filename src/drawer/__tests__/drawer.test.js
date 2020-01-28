/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {Drawer, StyledBackdrop, StyledClose, CLOSE_SOURCE} from '../index.js';
import {styled} from '../../styles/index.js';

jest.useFakeTimers();

jest.mock('../../layer/index.js', () => {
  return {
    Layer: jest.fn().mockImplementation(props => {
      return props.children;
    }),
  };
});

// Mock React 16 portals in a way that makes them easy to test
const originalCreatePortal = ReactDOM.createPortal;

// Mock document.addEventListener
const originalDocumentAddListener = document.addEventListener;

describe('Drawer', () => {
  let wrapper;

  beforeAll(() => {
    // $FlowFixMe
    ReactDOM.createPortal = jest.fn(e => (
      <div is-portal="true" key="portal">
        {e}
      </div>
    ));
    // $FlowFixMe
    document.addEventListener = jest.fn();
  });

  afterEach(() => {
    // $FlowFixMe
    ReactDOM.createPortal.mockClear();
    document.addEventListener.mockClear();
    wrapper && wrapper.unmount();
  });

  afterAll(() => {
    // $FlowFixMe
    ReactDOM.createPortal = originalCreatePortal;
    // $FlowFixMe
    document.addEventListener = originalDocumentAddListener;
  });

  test('renders nothing when closed', () => {
    wrapper = mount(
      <Drawer isOpen={false} anchor="right">
        Hello world
      </Drawer>,
    );

    expect(wrapper).toBeEmptyRender();
  });

  test('renders portal when open', () => {
    wrapper = mount(
      <Drawer isOpen anchor="right">
        Drawer Body
      </Drawer>,
    );

    expect(wrapper).toMatchSnapshot('Rendered Drawer');
  });

  test('close button triggers close', () => {
    const onClose = jest.fn();
    wrapper = mount(
      <Drawer isOpen onClose={onClose} anchor="right">
        Drawer Body
      </Drawer>,
    );

    wrapper.find(StyledClose).simulate('click');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenLastCalledWith({
      closeSource: CLOSE_SOURCE.closeButton,
    });
  });

  test('backdrop triggers close', () => {
    const onClose = jest.fn();
    wrapper = mount(
      <Drawer isOpen onClose={onClose} anchor="right">
        Drawer Body
      </Drawer>,
    );

    wrapper.find(StyledBackdrop).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenLastCalledWith({
      closeSource: CLOSE_SOURCE.backdrop,
    });
  });

  test('disable closeable', () => {
    const onClose = jest.fn();
    wrapper = mount(
      <Drawer isOpen closeable={false} onClose={onClose}>
        Drawer Body
      </Drawer>,
    );

    expect(wrapper.find(StyledClose)).not.toExist();
    wrapper.find(StyledBackdrop).simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });

  test('prevents scroll on mount node', () => {
    const onClose = jest.fn();
    wrapper = mount(<Drawer onClose={onClose}>Drawer Body</Drawer>);

    const body = ((document.body: any): HTMLBodyElement);
    expect(body.style.overflow).toBe('');
    wrapper.setProps({isOpen: true});
    expect(body.style.overflow).toBe('hidden');
    wrapper.setProps({isOpen: false});
    expect(body.style.overflow).toBe('');
  });

  test('override components', () => {
    const Root = styled('div', {});
    const Backdrop = styled('div', {});
    const DrawerContainer = styled('div', {});
    const DrawerBody = styled('div', {});
    const Close = styled('div', {});
    wrapper = mount(
      <Drawer
        isOpen
        overrides={{
          Root,
          Backdrop,
          DrawerContainer,
          DrawerBody,
          Close,
        }}
      >
        Drawer Body
      </Drawer>,
    );

    expect(wrapper.find(Root)).toExist();
    expect(wrapper.find(Backdrop)).toExist();
    expect(wrapper.find(DrawerContainer)).toExist();
    expect(wrapper.find(DrawerBody)).toExist();
    expect(wrapper.find(Close)).toExist();
  });
});
