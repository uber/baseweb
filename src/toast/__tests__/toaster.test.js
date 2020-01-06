/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {
  KIND,
  PLACEMENT,
  toaster,
  ToasterContainer,
  Toast,
  StyledRoot,
  StyledBody,
  StyledCloseIcon,
} from '../index.js';

// Mock React 16 portals
const originalCreatePortal = ReactDOM.createPortal;

jest.useFakeTimers();

describe('toaster', () => {
  let wrapper;

  beforeAll(() => {
    // $FlowFixMe
    ReactDOM.createPortal = jest.fn(children => (
      <div is-portal="true" key="portal">
        {children}
      </div>
    ));
  });

  afterEach(() => {
    // $FlowFixMe
    ReactDOM.createPortal.mockClear();
    wrapper && wrapper.unmount();
  });

  afterAll(() => {
    // $FlowFixMe
    ReactDOM.createPortal = originalCreatePortal;
  });

  test('ToasterContainer', () => {
    wrapper = mount(<ToasterContainer />);
    const renderedToaster = wrapper.find(ToasterContainer).first();
    expect(renderedToaster.instance().state.isMounted).toBe(true);
    expect(renderedToaster.instance().state.toasts.length).toEqual(0);
    expect(wrapper.find(StyledRoot).first()).toExist();
  });

  describe('ToasterContainer props', () => {
    test.each(
      Object.keys(PLACEMENT).map(pl => {
        return [pl];
      }),
    )(
      '%s placement is passed to the Toaster and StyledRoot component',
      placement => {
        const props = {placement};
        wrapper = mount(<ToasterContainer {...props} />);
        expect(
          wrapper
            .find(ToasterContainer)
            .first()
            .props().placement,
        ).toEqual(placement);
        expect(
          wrapper
            .find(StyledRoot)
            .first()
            .props().$placement,
        ).toEqual(placement);
      },
    );

    test('portal is created when usePortal is set to true', () => {
      wrapper = mount(<ToasterContainer />);
      expect(
        wrapper
          .find(ToasterContainer)
          .first()
          .props().usePortal,
      ).toBe(true);
      expect(ReactDOM.createPortal).toHaveBeenCalled();
    });

    test('portal is not created when usePortal is set to false', () => {
      wrapper = mount(<ToasterContainer usePortal={false} />);
      expect(
        wrapper
          .find(ToasterContainer)
          .first()
          .props().usePortal,
      ).toBe(false);
      expect(ReactDOM.createPortal).not.toHaveBeenCalled();
    });
  });

  describe('toaster overrides', () => {
    test('Inner components override', () => {
      const overrides = {
        Root: jest
          .fn()
          .mockImplementation(({children}) => <div>{children}</div>),
        ToastBody: jest
          .fn()
          .mockImplementation(({children}) => <div>{children}</div>),
        ToastCloseIcon: jest
          .fn()
          .mockImplementation(({children}) => <svg>{children}</svg>),
      };
      // $FlowFixMe
      wrapper = mount(<ToasterContainer overrides={overrides} />);
      const renderedToaster = wrapper.find(ToasterContainer).first();
      toaster.getRef = jest.fn().mockReturnValue(renderedToaster.instance());
      toaster.show('Toast message');
      wrapper.update();

      Object.keys(overrides).forEach(name => {
        // $FlowFixMe
        expect(wrapper.find(overrides[name]).first()).toExist();
      });
    });

    test('Inner components props and styles overrides', () => {
      const overrides = {
        Root: {
          props: {'data-attr': 'root'},
          style: {borderColor: 'skyblue'},
        },
        ToastBody: {
          props: {'data-attr': 'body'},
          style: {backgroundColor: 'skyblue'},
        },
        ToastCloseIcon: {
          props: {'data-attr': 'closeIcon'},
          style: {color: 'blue'},
        },
      };
      const components = {
        Root: StyledRoot,
        ToastBody: StyledBody,
        ToastCloseIcon: StyledCloseIcon,
      };
      wrapper = mount(<ToasterContainer overrides={overrides} />);

      const renderedToaster = wrapper.find(ToasterContainer).first();
      toaster.getRef = jest.fn().mockReturnValue(renderedToaster.instance());
      toaster.show('Toast message');
      wrapper.update();

      Object.keys(overrides).forEach(name => {
        const passedProps = wrapper
          .find(components[name])
          .first()
          .props();
        expect(passedProps['data-attr']).toEqual(
          overrides[name].props['data-attr'],
        );
        expect(passedProps.$style).toEqual(overrides[name].style);
      });
    });
  });

  describe('toaster methods', () => {
    let renderedToaster;

    beforeEach(() => {
      wrapper = mount(<ToasterContainer />);
      renderedToaster = wrapper.find(ToasterContainer).first();
      toaster.getRef = jest.fn().mockReturnValue(renderedToaster.instance());
    });

    test('toaster[show | update | clear]', () => {
      let toastCounter = 0;
      const toasterInstance = renderedToaster.instance();

      // test toast is updated
      function getKey() {
        return `test-toast-${toastCounter++}`;
      }
      const MockNode1 = (jest.fn().mockImplementation(() => 'Toast 1'): any);
      const MockNode2 = (jest.fn().mockImplementation(() => 'Toast 2'): any);
      const props1 = {key: getKey(), children: <MockNode1 />};
      const props2 = {key: getKey(), children: <MockNode2 />};

      const showSpy = jest.spyOn(toasterInstance, 'show');

      // add the first Toast
      const toastKey1: any = toaster.show(props1.children, {key: props1.key});
      jest.runAllTimers();

      expect(showSpy).toHaveBeenCalledTimes(1);
      expect(showSpy).toHaveBeenCalledWith(props1);
      expect(toasterInstance.state.toasts.length).toEqual(1);
      expect(toasterInstance.state.toasts[0]).toMatchObject(props1);

      // verify that first Toast is rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(1);
      expect(wrapper.find(StyledBody).length).toEqual(1);
      expect(wrapper.find(MockNode1).length).toEqual(1);

      // add the second Toast
      toaster.show(props2.children, {key: props2.key});
      jest.runAllTimers();

      expect(showSpy).toHaveBeenCalledTimes(2);
      expect(showSpy).toHaveBeenLastCalledWith(props2);
      expect(toasterInstance.state.toasts.length).toEqual(2);
      expect(toasterInstance.state.toasts[1]).toMatchObject(props2);

      // verify that second Toast is rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(2);
      expect(wrapper.find(StyledBody).length).toEqual(2);
      expect(wrapper.find(MockNode2).length).toEqual(1);

      // test toast is updated
      const updateSpy = jest.spyOn(toasterInstance, 'update');

      const MockNode3 = (jest
        .fn()
        .mockImplementation(() => 'Toast updated'): any);
      const updatedProps = {
        children: <MockNode3 />,
        kind: KIND.positive,
      };

      toaster.update(toastKey1, updatedProps);
      jest.runAllTimers();

      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(toastKey1, updatedProps);
      expect(toasterInstance.state.toasts.length).toEqual(2);
      expect(toasterInstance.state.toasts[0]).toMatchObject({
        ...props1,
        ...updatedProps,
      });
      expect(toasterInstance.state.toasts[1]).toMatchObject(props2);

      // verify that updated children are rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(2);
      expect(wrapper.find(StyledBody).length).toEqual(2);
      expect(wrapper.find(MockNode1).length).toEqual(0);
      expect(wrapper.find(MockNode3).length).toEqual(1);

      // test toast is cleared
      const clearSpy = jest.spyOn(toasterInstance, 'clear');

      toaster.clear(toastKey1);
      jest.runAllTimers();

      expect(clearSpy).toHaveBeenCalled();
      expect(clearSpy).toHaveBeenCalledWith(toastKey1);
      expect(toasterInstance.state.toasts.length).toEqual(1);

      // verify that dismissed toast is not rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(1);
      expect(wrapper.find(StyledBody).length).toEqual(1);
      expect(wrapper.find(MockNode3).length).toEqual(0);
      expect(wrapper.find(MockNode2).length).toEqual(1);
    });

    test('info, positive, warning, negative methods and clear all', () => {
      const toasterInstance = renderedToaster.instance();
      let counter = 0;
      ['info', 'positive', 'warning', 'negative'].forEach(method => {
        const children = `${method} toast`;
        toaster[method](children);
        counter++;
        const toastsLength = toasterInstance.state.toasts.length;
        expect(toastsLength).toEqual(counter);
        expect(toasterInstance.state.toasts[toastsLength - 1]).toMatchObject({
          key: `toast-${counter - 1}`,
          children,
          kind: KIND[method],
        });
      });

      // verify all toasts rendered
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(4);
      // verify oldest toasts are rendered last in the tree
      expect(
        wrapper
          .find(Toast)
          .last()
          .props(),
      ).toMatchObject({
        kind: KIND.info,
      });

      // verify all toasts are cleared
      const clearSpy = jest.spyOn(toasterInstance, 'clear');

      toaster.clear();
      jest.runAllTimers();

      expect(clearSpy).toHaveBeenCalled();
      expect(clearSpy).toHaveBeenCalledWith(undefined);

      // verify no toasts are rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(0);
    });

    test('onClose toast handler is called', () => {
      const onClose = jest.fn();
      const toastKey = toaster.show('Toast message', {onClose});

      // verify the toast is rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(1);

      // verify the toast is cleared
      toaster.clear(toastKey);
      jest.runAllTimers();

      // verify the onClose toast handler is called
      expect(onClose).toHaveBeenCalled();

      // verify no toasts are rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(0);
    });

    test('toast is cleared and onClose is called when it is dismissed by a user', () => {
      const toasterInstance = renderedToaster.instance();
      const onClose = jest.fn();
      toaster.show('Toast message', {onClose});

      // verify the toast is rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(1);
      const closeButton = wrapper.find(StyledCloseIcon).first();
      expect(closeButton).toExist();

      // verify the toast is cleared
      closeButton.simulate('click');
      jest.runAllTimers();

      // verify the toast is removed from the list
      expect(toasterInstance.state.toasts.length).toEqual(0);

      // verify the onClose toast handler is called
      expect(onClose).toHaveBeenCalled();

      // verify no toasts are rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(0);
    });
  });

  describe('ToasterContainer autoHideDuration', () => {
    let renderedToaster;

    beforeEach(() => {
      wrapper = mount(<ToasterContainer autoHideDuration={100} />);
      renderedToaster = wrapper.find(ToasterContainer).first();
      toaster.getRef = jest.fn().mockReturnValue(renderedToaster.instance());
    });

    test('info, positive, warning, negative methods receives autoHideDuration from ToastContainer', () => {
      // The testing strategy is to instantiate ToasterContainer with autoHideDuration=100
      // Then call the 4 different toaster regularly
      // Then call 1 toaster.negative with an overriding autoHideDuration=3500
      //
      // Expected outcome:
      // Initially, there should be a total of 5 Toasts
      // After jest timers get advanced by 1000, there should be 1 Toast remaining
      // After jest timers get advanced by 3000, there should be 0 Toast remaining
      const toasterInstance = renderedToaster.instance();
      let counter = 0;
      ['info', 'positive', 'warning', 'negative'].forEach(method => {
        const children = `${method} toast`;
        toaster[method](children);
        counter++;
        const toastsLength = toasterInstance.state.toasts.length;
        expect(toastsLength).toEqual(counter);
        expect(toasterInstance.state.toasts[toastsLength - 1]).toMatchObject({
          key: `toast-${counter - 1}`,
          children,
          kind: KIND[method],
        });
      });

      toaster.negative('custom autoHideDuration', {
        autoHideDuration: 3500,
      });

      // verify all toasts rendered
      jest.advanceTimersByTime(100);
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(5);
      // verify oldest toasts are rendered last in the tree
      expect(
        wrapper
          .find(Toast)
          .last()
          .props(),
      ).toMatchObject({
        kind: KIND.info,
      });

      jest.advanceTimersByTime(1000);

      // verify there's one remaining toast rendered
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(1);

      // verify there's no remaining toasts rendered
      jest.advanceTimersByTime(3000);
      wrapper.update();
      expect(wrapper.find(Toast).length).toEqual(0);
    });
  });
});
