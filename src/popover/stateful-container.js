/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  STATE_CHANGE_TYPE,
  TRIGGER_TYPE,
} from './constants.js';
import type {
  PopoverPropsWithoutChildrenT,
  StateT,
  StatefulPopoverContainerPropsT,
  StateChangeTypeT,
  StateReducerT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer extends React.Component<
  StatefulPopoverContainerPropsT,
  StateT,
> {
  static defaultProps: $Shape<StatefulPopoverContainerPropsT> = {
    accessibilityType: ACCESSIBILITY_TYPE.menu,
    ignoreBoundary: false,
    overrides: {},
    onMouseEnterDelay: 200,
    onMouseLeaveDelay: 200,
    placement: PLACEMENT.auto,
    popperOptions: {},
    showArrow: false,
    triggerType: TRIGGER_TYPE.click,
    dismissOnClickOutside: true,
    dismissOnEsc: true,
    stateReducer: defaultStateReducer,
  };

  state = {
    isOpen: false,
    ...this.props.initialState,
  };

  onBlur = () => {
    this.close();
  };

  onClick = (e: Event) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  onClickOutside = () => {
    this.close();
  };

  onEsc = () => {
    this.close();
  };

  onFocus = () => {
    this.open();
  };

  onMouseEnter = () => {
    this.open();
  };

  onMouseLeave = () => {
    this.close();
  };

  onContentClose = () => {
    this.close();
  };

  open() {
    this.internalSetState(STATE_CHANGE_TYPE.open, {
      isOpen: true,
    });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  close() {
    this.internalSetState(STATE_CHANGE_TYPE.close, {
      isOpen: false,
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  internalSetState(type: StateChangeTypeT, changes: StateT) {
    const {stateReducer} = this.props;
    if (typeof stateReducer !== 'function') {
      this.setState(changes);
      return;
    }
    this.setState(prevState => stateReducer(type, changes, prevState));
  }

  /**
   * If user passed a content render prop, we want to give them a
   * callback to close the Popover. This is useful in any case where
   * a dev wants to manually close the popover based on some action.
   *
   * One simple example is a Popover with a "Dismiss" button in it:
   * <StatefulPopover content={({close}) => <button onClick={close}>Dismiss</button>}>
   *  Click me
   * </StatefulPopover>
   */
  renderContent = () => {
    const {content} = this.props;
    if (typeof content === 'function') {
      return content({close: this.onContentClose});
    }
    return content;
  };

  render() {
    const {
      accessibilityType,
      dismissOnClickOutside,
      dismissOnEsc,
      ignoreBoundary,
      overrides,
      onMouseEnterDelay,
      onMouseLeaveDelay,
      placement,
      popperOptions,
      showArrow,
      triggerType,
      mountNode,
    } = this.props;

    const popoverProps: PopoverPropsWithoutChildrenT = {
      accessibilityType,
      ignoreBoundary,
      isOpen: this.state.isOpen,
      overrides,
      content: this.renderContent,
      onMouseEnterDelay,
      onMouseLeaveDelay,
      placement,
      popperOptions,
      showArrow,
      triggerType,
      mountNode,
    };

    if (dismissOnClickOutside) {
      popoverProps.onClickOutside = this.onClickOutside;
    }
    if (dismissOnEsc) {
      popoverProps.onEsc = this.onEsc;
    }
    if (triggerType === TRIGGER_TYPE.hover) {
      popoverProps.onBlur = this.onBlur;
      popoverProps.onFocus = this.onFocus;
      popoverProps.onMouseEnter = this.onMouseEnter;
      popoverProps.onMouseLeave = this.onMouseLeave;
    } else {
      popoverProps.onClick = this.onClick;
    }

    return this.props.children(popoverProps);
  }
}

export default StatefulContainer;
