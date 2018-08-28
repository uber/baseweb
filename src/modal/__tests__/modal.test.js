/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
/* eslint-env browser */

import React from 'react';
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
  StyledRoot,
  CLOSE_SOURCE,
} from '../index';

jest.useFakeTimers();

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
    ReactDOM.createPortal.mockClear();
    document.addEventListener.mockClear();
    wrapper && wrapper.unmount();
  });

  afterAll(() => {
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
    expect(onClose).toHaveBeenLastCalledWith(CLOSE_SOURCE.closeButton);
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
    expect(onClose).toHaveBeenLastCalledWith(CLOSE_SOURCE.backdrop);
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

  test('override components', () => {
    const mock = () =>
      jest.fn().mockImplementation(({children}) => <div>{children}</div>);
    const Root = mock();
    const Backdrop = mock();
    const DialogContainer = mock();
    const Dialog = mock();
    const Close = mock();
    wrapper = mount(
      <Modal
        isOpen
        overrides={{
          // $FlowFixMe
          Root,
          // $FlowFixMe
          Backdrop,
          // $FlowFixMe
          DialogContainer,
          // $FlowFixMe
          Dialog,
          // $FlowFixMe
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
      <Modal role="mycustomrole" isOpen>
        <ModalBody>Modal Body</ModalBody>
      </Modal>,
    );

    expect(wrapper.find(StyledRoot)).toHaveProp('role', 'mycustomrole');
    expect(wrapper.find(StyledDialog)).toHaveProp('role', 'document');
  });
});
