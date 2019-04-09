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
      // Defaults to -1 so no item is highlighted
      highlightedIndex: -1,
      isFocused: false,
    },
    stateReducer: (
      changeType: ?$PropertyType<StateReducerFnT, 'changeType'>,
      changes: $PropertyType<StateReducerFnT, 'changes'>,
    ) => changes,
    onItemSelect: () => {},
    getRequiredItemProps: () => ({}),
    children: () => null,

    // from nested-menus context
    addMenuToNesting: () => {},
    removeMenuFromNesting: () => {},
    getParentMenu: () => {},
    getChildMenu: () => {},
  };

  state: StatefulContainerStateT = {...this.props.initialState};

  componentDidMount() {
    if (__BROWSER__) {
      if (
        this.state.highlightedIndex > -1 &&
        this.refList[this.state.highlightedIndex]
      ) {
        scrollItemIntoView(
          this.refList[this.state.highlightedIndex].current,
          this.rootRef.current,
          this.state.highlightedIndex === 0,
          this.state.highlightedIndex === this.props.items.length - 1,
        );
      }

      if (this.state.isFocused) {
        document.addEventListener('keydown', this.onKeyDown);
      }
    }
    this.props.addMenuToNesting && this.props.addMenuToNesting(this.rootRef);
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('keydown', this.onKeyDown);
    }
    this.props.removeMenuFromNesting &&
      this.props.removeMenuFromNesting(this.rootRef);
  }

  componentDidUpdate(_: mixed, prevState: StatefulContainerStateT) {
    if (__BROWSER__) {
      if (!prevState.isFocused && this.state.isFocused) {
        document.addEventListener('keydown', this.onKeyDown);
      } else if (prevState.isFocused && !this.state.isFocused) {
        document.removeEventListener('keydown', this.onKeyDown);
      }
    }
  }

  // One array to hold all of list item refs
  refList: Array<React$ElementRef<*>> = [];

  // We need to have access to the root component user renders
  // to correctly facilitate keyboard scrolling behavior
  rootRef: RootRefT = React.createRef();

  // Internal set state function that will also invoke stateReducer
  internalSetState(
    changeType: $Keys<typeof STATE_CHANGE_TYPES>,
    changes: $Shape<StatefulContainerStateT>,
  ) {
    const {stateReducer} = this.props;
    this.setState(stateReducer(changeType, changes, this.state));
  }

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case KEY_STRINGS.ArrowUp:
      case KEY_STRINGS.ArrowDown:
      case KEY_STRINGS.ArrowLeft:
      case KEY_STRINGS.ArrowRight:
        this.handleArrowKey(event);
        break;
      case KEY_STRINGS.Enter:
        this.handleEnterKey(event);
        break;
    }
  };

  // Handler for arrow keys
  handleArrowKey = (event: KeyboardEvent) => {
    event.preventDefault();
    const prevIndex = this.state.highlightedIndex;
    let nextIndex = prevIndex;

    if (event.key === KEY_STRINGS.ArrowUp) {
      nextIndex = Math.max(0, prevIndex - 1);
      this.internalSetState(STATE_CHANGE_TYPES.moveUp, {
        highlightedIndex: nextIndex,
      });
    } else if (event.key === KEY_STRINGS.ArrowDown) {
      nextIndex = Math.min(prevIndex + 1, this.props.items.length - 1);
      this.internalSetState(STATE_CHANGE_TYPES.moveDown, {
        highlightedIndex: nextIndex,
      });
    } else if (event.key === KEY_STRINGS.ArrowLeft) {
      if (this.props.getParentMenu) {
        const parent = this.props.getParentMenu(this.rootRef);
        if (parent && parent.current) {
          parent.current.focus();
        }
      }
    } else if (event.key === KEY_STRINGS.ArrowRight) {
      if (this.props.getChildMenu) {
        const child = this.props.getChildMenu(this.rootRef);
        if (child && child.current) {
          child.current.focus();
        }
      }
    }

    if (this.refList[nextIndex]) {
      scrollItemIntoView(
        this.refList[nextIndex].current,
        this.rootRef.current,
        nextIndex === 0,
        nextIndex === this.props.items.length - 1,
      );
    }
  };

  // Handler for enter key
  handleEnterKey = (event: KeyboardEvent) => {
    const {items, onItemSelect} = this.props;
    const {highlightedIndex} = this.state;
    if (
      items[highlightedIndex] &&
      onItemSelect &&
      !items[highlightedIndex].disabled
    ) {
      onItemSelect({item: items[highlightedIndex], event});
    }
  };

  getRequiredItemProps: GetRequiredItemPropsFnT = (item, index) => {
    let itemRef = this.refList[index];
    if (!itemRef) {
      itemRef = React.createRef();
      this.refList[index] = itemRef;
    }
    return {
      disabled: !!item.disabled,
      ref: itemRef,
      isFocused: this.state.isFocused,
      isHighlighted: this.state.highlightedIndex === index,
      onClick: () => {
        if (this.props.onItemSelect && !item.disabled) {
          this.props.onItemSelect({item});
          this.internalSetState(STATE_CHANGE_TYPES.click, {
            highlightedIndex: index,
          });
        }
      },
      onMouseEnter: () => {
        this.internalSetState(STATE_CHANGE_TYPES.mouseEnter, {
          highlightedIndex: index,
        });
      },
      resetMenu: this.resetMenu,
      ...this.props.getRequiredItemProps(item, index),
    };
  };

  focusMenu = (event: FocusEvent | MouseEvent | KeyboardEvent) => {
    if (this.state.isFocused) {
      return;
    }

    if (this.rootRef.current.contains(event.target)) {
      if (this.state.highlightedIndex < 0) {
        this.internalSetState(STATE_CHANGE_TYPES.focus, {
          isFocused: true,
          highlightedIndex: 0,
        });
      } else {
        this.internalSetState(STATE_CHANGE_TYPES.focus, {isFocused: true});
      }

      this.rootRef.current.focus();
    }
  };

  unfocusMenu = () => {
    this.internalSetState(STATE_CHANGE_TYPES.focus, {isFocused: false});
  };

  resetMenu = () => {
    this.internalSetState(STATE_CHANGE_TYPES.reset, {
      isFocused: false,
      highlightedIndex: -1,
    });
  };

  render() {
    return this.props.children(
      ({
        getRequiredItemProps: this.getRequiredItemProps,
        highlightedIndex: this.state.highlightedIndex,
        isFocused: this.state.isFocused,
        items: this.props.items,
        focusMenu: this.focusMenu,
        unfocusMenu: this.unfocusMenu,
        rootRef: this.rootRef,
      }: RenderPropsT),
    );
  }
}
