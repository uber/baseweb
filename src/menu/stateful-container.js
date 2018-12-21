/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
// Files
import {STATE_CHANGE_TYPES, KEY_STRINGS} from './constants.js';
import {scrollItemIntoView} from './utils.js';
// Types
import type {
  StatefulContainerPropsT,
  StatefulContainerStateT,
  GetRequiredItemPropsFnT,
  RootRefT,
  RenderPropsT,
  StateReducerFnT,
} from './types.js';

export default class MenuStatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StatefulContainerStateT,
> {
  static defaultProps = {
    initialState: {
      // We start the index at -1 to indicate that no highlighting exists initially
      highlightedIndex: -1,
    },
    stateReducer: (
      changeType: ?$PropertyType<StateReducerFnT, 'changeType'>,
      changes: $PropertyType<StateReducerFnT, 'changes'>,
    ) => changes,
    onItemSelect: () => {},
    getRequiredItemProps: () => ({}),
    children: () => null,
  };

  state: StatefulContainerStateT = {...this.props.initialState};

  componentDidMount() {
    if (__BROWSER__) {
      // TODO(#185): perhaps only bind event listener on focus
      document.addEventListener('keydown', this.onKeyDown);
      this.state.highlightedIndex > -1 &&
        scrollItemIntoView({
          node: this.refList[this.state.highlightedIndex],
          parentNode: this.rootRef,
          isFirst: this.state.highlightedIndex === 0,
          isLast: this.state.highlightedIndex === this.props.items.length - 1,
        });
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  // One array to hold all of list item refs
  refList: Array<React$ElementRef<*>> = [];

  // We need to have access to the root component user renders
  // to correctly facilitate keyboard scrolling behavior
  rootRef: RootRefT = React.createRef();

  // Internal set state function that will also invoke stateReducer
  internalSetState(
    changeType: ?$Keys<typeof STATE_CHANGE_TYPES>,
    changes: StatefulContainerStateT,
  ) {
    const {stateReducer} = this.props;
    this.setState(stateReducer(changeType, changes, this.state));
  }

  // Regular type here because this is not done through React
  onKeyDown = (event: KeyboardEvent) => {
    // Up arrow
    switch (event.key) {
      case KEY_STRINGS.ArrowUp:
      case KEY_STRINGS.ArrowDown:
        this.handleArrowKey(event.key);
        event.preventDefault();
        event.stopPropagation();
        break;
      case KEY_STRINGS.Enter:
        this.handleEnterKey(event);
        event.preventDefault();
        break;
    }
  };

  // Handler for arrow keys
  handleArrowKey(key: string) {
    const {items} = this.props;
    const {highlightedIndex: oldIndex} = this.state;
    let highlightedIndex = oldIndex;
    let stateChangeType = null;
    if (key === KEY_STRINGS.ArrowUp) {
      highlightedIndex = Math.max(0, oldIndex - 1);
      stateChangeType = STATE_CHANGE_TYPES.moveUp;
    } else if (key === KEY_STRINGS.ArrowDown) {
      highlightedIndex = Math.min(oldIndex + 1, items.length - 1);
      stateChangeType = STATE_CHANGE_TYPES.moveDown;
    }
    scrollItemIntoView({
      node: this.refList[highlightedIndex],
      parentNode: this.rootRef,
      isFirst: highlightedIndex === 0,
      isLast: highlightedIndex === items.length - 1,
    });
    this.internalSetState(stateChangeType, {highlightedIndex});
  }

  // Handler for enter key
  handleEnterKey(event: KeyboardEvent) {
    const {items, onItemSelect} = this.props;
    const {highlightedIndex} = this.state;
    if (items[highlightedIndex] && onItemSelect) {
      onItemSelect({item: items[highlightedIndex], event});
    }
  }

  getRequiredItemProps: GetRequiredItemPropsFnT = (item, index) => {
    const {highlightedIndex} = this.state;
    const {onItemSelect, getRequiredItemProps} = this.props;
    let onClickHandler;
    if (onItemSelect) {
      onClickHandler = onItemSelect.bind(null, {item});
    }
    // Create and store ref or re-use
    let itemRef = this.refList[index];
    if (!itemRef) {
      itemRef = React.createRef();
      this.refList[index] = itemRef;
    }
    return {
      ref: itemRef,
      isHighlighted: highlightedIndex === index,
      onClick: onClickHandler,
      'aria-activedescendant': highlightedIndex === index,
      ...getRequiredItemProps(item, index),
    };
  };

  render() {
    const {highlightedIndex} = this.state;
    const {children, items} = this.props;
    return children(
      ({
        getRequiredItemProps: this.getRequiredItemProps,
        highlightedIndex,
        items,
        rootRef: this.rootRef,
      }: RenderPropsT),
    );
  }
}
