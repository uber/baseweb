// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  StatefulContainer,
  PLACEMENT,
  TRIGGER_TYPE,
  STATE_CHANGE_TYPE,
} from './index';
import type {PopoverPropsWithoutChildrenT} from './types';

describe('StatefulPopoverContainer', () => {
  test('basic render', () => {
    const props = {
      components: {
        Body: function CustomBody() {
          return <span />;
        },
      },
      content: jest.fn(),
      onMouseEnterDelay: 100,
      onMouseLeaveDelay: 200,
      placement: PLACEMENT.topLeft,
      showArrow: true,
      triggerType: TRIGGER_TYPE.hover,
      dismissOnClickOutside: true,
      dismissOnEsc: true,
      initialState: {
        isOpen: true,
      },
      onClose: jest.fn(),
      onOpen: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    shallow(<StatefulContainer {...props}>{children}</StatefulContainer>);

    expect(children).toHaveBeenCalledTimes(1);
    expect(children.mock.calls[0]).toMatchSnapshot(
      'function-as-child called with correct args',
    );
  });

  test('dismissOnClickOutside', () => {
    const props = {
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    expect(component).toHaveState('isOpen', true);

    // dismissOnClickOutside should default to true - onClickOutside should be set
    let propsReceived: PopoverPropsWithoutChildrenT = children.mock.calls[0][0];

    expect(propsReceived.onClickOutside).toBe(
      component.instance().onClickOutside,
    );

    // Check that onClickOutside callback properly updates component state
    // $FlowFixMe - Flow can't infer that expect() above ensures non-nullity
    propsReceived.onClickOutside();
    expect(component).toHaveState('isOpen', false);

    // onClickOutside should not be passed if dismissOnClickOutside is false
    component.setProps({dismissOnClickOutside: false});
    propsReceived = children.mock.calls[2][0];
    expect(propsReceived.onClickOutside).toBeUndefined();
  });

  test('dismissOnEsc', () => {
    const props = {
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    // dismissOnEsc should default to true - onEsc should be set
    let propsReceived: PopoverPropsWithoutChildrenT = children.mock.calls[0][0];

    expect(propsReceived.onEsc).toBe(component.instance().onEsc);

    // Check that onEsc callback properly updates component state
    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onEsc();
    expect(component).toHaveState('isOpen', false);

    // onEsc should not be passed if dismissOnEsc is false
    component.setProps({dismissOnEsc: false});
    propsReceived = children.mock.calls[2][0];
    expect(propsReceived.onEsc).toBeUndefined();
  });

  test('triggerType events', () => {
    const props = {
      content: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    // Should have hover-related callbacks
    let propsReceived: PopoverPropsWithoutChildrenT = children.mock.calls[0][0];

    expect(propsReceived.onMouseEnter).toBe(component.instance().onMouseEnter);
    expect(propsReceived.onMouseLeave).toBe(component.instance().onMouseLeave);
    expect(propsReceived.onFocus).toBe(component.instance().onFocus);
    expect(propsReceived.onBlur).toBe(component.instance().onBlur);
    expect(propsReceived.onClick).toBeUndefined();

    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onMouseEnter();
    expect(component).toHaveState('isOpen', true);
    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onMouseLeave();
    expect(component).toHaveState('isOpen', false);
    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onFocus();
    expect(component).toHaveState('isOpen', true);
    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onBlur();
    expect(component).toHaveState('isOpen', false);

    // After setting triggerType to click, should have click-related callbacks
    component.setProps({triggerType: TRIGGER_TYPE.click});

    expect(children.mock.calls).toHaveLength(6);
    propsReceived = children.mock.calls[5][0];
    expect(propsReceived.onClick).toBe(component.instance().onClick);
    expect(propsReceived.onMouseEnter).toBeUndefined();
    expect(propsReceived.onMouseLeave).toBeUndefined();
    expect(propsReceived.onFocus).toBeUndefined();
    expect(propsReceived.onBlur).toBeUndefined();

    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onClick();
    expect(component).toHaveState('isOpen', true);
    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    propsReceived.onClick();
    expect(component).toHaveState('isOpen', false);
  });

  test('content prop receives close callback', () => {
    const props = {
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    expect(children).toHaveBeenCalledTimes(1);
    const contentProp = children.mock.calls[0][0].content;

    expect(contentProp).toBe(component.instance().renderContent);
    component.instance().renderContent();

    expect(props.content).toHaveBeenCalledTimes(1);
    expect(props.content).toHaveBeenCalledWith({
      close: component.instance().onContentClose,
    });
    // $FlowFixMe - This invocation refines props.content and creates a flow error
    props.content.mock.calls[0][0].close();

    expect(component).toHaveState('isOpen', false);
  });

  test('stateReducer', () => {
    const props = {
      content: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    // Block opening
    props.stateReducer.mockReturnValueOnce({isOpen: false});
    component.instance().onClick();

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenLastCalledWith(
      STATE_CHANGE_TYPE.open,
      {isOpen: true},
      {isOpen: false},
    );
    expect(component).toHaveState('isOpen', false);

    // Open
    props.stateReducer.mockReturnValueOnce({isOpen: true});
    component.instance().onClick();
    expect(component).toHaveState('isOpen', true);

    // Block closing
    props.stateReducer.mockClear();
    props.stateReducer.mockReturnValueOnce({isOpen: true});
    component.instance().onClick();

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenLastCalledWith(
      STATE_CHANGE_TYPE.close,
      {isOpen: false},
      {isOpen: true},
    );
    expect(component).toHaveState('isOpen', true);
  });

  test('null stateReducer', () => {
    const props = {
      content: jest.fn(),
      stateReducer: null,
    };
    const children = jest.fn();

    const component = shallow(
      // $FlowFixMe - Allow null stateReducer for the sake of testing
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    // null state reducer shouldnt break component
    component.instance().onClick();
    expect(component).toHaveState('isOpen', true);
  });
});
