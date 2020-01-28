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
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  StyledBackdrop,
  StyledClose,
  StyledDialog,
  CLOSE_SOURCE,
} from '../index.js';

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

describe('Modal', () => {
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
      <Modal isOpen={false}>
        <ModalBody>Hello world</ModalBody>
      </Modal>,
    );

    expect(wrapper).toBeEmptyRender();
  });

  test('renders portal when open', () => {
    wrapper = mount(
      <Modal isOpen>
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>,
    );

    expect(wrapper).toMatchSnapshot('Rendered Modal');
  });

  test('close button triggers close', () => {
    const onClose = jest.fn();
    wrapper = mount(
      <Modal isOpen onClose={onClose}>
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
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
      <Modal isOpen onClose={onClose}>
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
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
      <Modal isOpen closeable={false} onClose={onClose}>
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
    );

    expect(wrapper.find(StyledClose)).not.toExist();
    wrapper.find(StyledBackdrop).simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });

  test('prevents scroll on mount node', () => {
    const onClose = jest.fn();
    wrapper = mount(
      <Modal onClose={onClose}>
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
    );

    const body = ((document.body: any): HTMLBodyElement);
    expect(body.style.overflow).toBe('');
    wrapper.setProps({isOpen: true});
    expect(body.style.overflow).toBe('hidden');
    wrapper.setProps({isOpen: false});
    expect(body.style.overflow).toBe('');
  });

  describe('nested modals', () => {
    const TwoModals = ({isOpen1 = false, isOpen2 = false}) => (
      <>
        <Modal isOpen={isOpen1}>Modal 1</Modal>
        <Modal isOpen={isOpen2}>Modal 2</Modal>,
      </>
    );

    test('resets body scroll when top closes first', () => {
      wrapper = mount(<TwoModals />);

      const body = ((document.body: any): HTMLBodyElement);
      expect(body.style.overflow).toBe('');

      wrapper.setProps({isOpen1: true, isOpen2: false});
      expect(body.style.overflow).toBe('hidden');

      wrapper.setProps({isOpen1: true, isOpen2: true});
      expect(body.style.overflow).toBe('hidden');

      wrapper.setProps({isOpen1: true, isOpen2: false});
      expect(body.style.overflow).toBe('hidden');

      wrapper.setProps({isOpen1: false, isOpen2: false});
      expect(body.style.overflow).toBe('');
    });

    test('resets body scroll when bottom closes first', () => {
      wrapper = mount(<TwoModals />);

      const body = ((document.body: any): HTMLBodyElement);
      expect(body.style.overflow).toBe('');

      wrapper.setProps({isOpen1: true, isOpen2: false});
      expect(body.style.overflow).toBe('hidden');

      wrapper.setProps({isOpen1: true, isOpen2: true});
      expect(body.style.overflow).toBe('hidden');

      wrapper.setProps({isOpen1: false, isOpen2: true});
      expect(body.style.overflow).toBe('');

      wrapper.setProps({isOpen1: false, isOpen2: false});
      expect(body.style.overflow).toBe('');
    });
  });

  test('override components', () => {
    const Root = styled('div', {});
    const Backdrop = styled('div', {});
    const DialogContainer = styled('div', {});
    const Dialog = styled('div', {});
    const Close = styled('div', {});
    wrapper = mount(
      <Modal
        isOpen
        overrides={{
          Root,
          Backdrop,
          DialogContainer,
          Dialog,
          Close,
        }}
      >
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
    );

    expect(wrapper.find(Root)).toExist();
    expect(wrapper.find(Backdrop)).toExist();
    expect(wrapper.find(DialogContainer)).toExist();
    expect(wrapper.find(Dialog)).toExist();
    expect(wrapper.find(Close)).toExist();
  });

  test('role', () => {
    wrapper = mount(
      // eslint-disable-next-line jsx-a11y/aria-role
      <Modal role="mycustomrole" isOpen>
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
    );

    expect(wrapper.find(StyledDialog)).toHaveProp('role', 'mycustomrole');
  });
});
