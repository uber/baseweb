/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
  RenderPropsT,
  StateReducerFnT,
} from './types.js';

export default class MenuStatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StatefulContainerStateT,
> {
  static defaultProps = {
    // keeping it in defaultProps to satisfy Flow
    initialState: {
      // We start the index at -1 to indicate that no highlighting exists initially
      highlightedIndex: -1,
      isFocused: false,
      activedescendantId: null,
    },
    stateReducer: ((changeType, changes) => changes: StateReducerFnT),
    onItemSelect: () => {},
    getRequiredItemProps: () => ({}),
    children: () => null,

    // from nested-menus context
    addMenuToNesting: () => {},
    removeMenuFromNesting: () => {},
    getParentMenu: () => {},
    getChildMenu: () => {},
  };

  state: StatefulContainerStateT = {
    ...this.constructor.defaultProps.initialState,
    ...this.props.initialState,
  };

  // We need to have access to the root component user renders
  // to correctly facilitate keyboard scrolling behavior
  rootRef = (React.createRef(): {current: HTMLElement | null});

  getItems() {
    if (Array.isArray(this.props.items)) {
      return this.props.items;
    }
    const optgroups = Object.keys(this.props.items);
    return optgroups.reduce((output, optgroup) => {
      // $FlowFixMe already checked above that items is grouped shape
      return output.concat(this.props.items[optgroup]);
    }, []);
  }

  componentDidMount() {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
    if (__BROWSER__) {
      if (
        rootRef.current /** This condition added to satisfy Flow */ &&
        this.state.highlightedIndex > -1 &&
        this.refList[this.state.highlightedIndex]
      ) {
        scrollItemIntoView(
          this.refList[this.state.highlightedIndex].current,
          rootRef.current,
          this.state.highlightedIndex === 0,
          this.state.highlightedIndex === this.getItems().length - 1,
          'center',
        );
      }

      if (this.state.isFocused) {
        document.addEventListener('keydown', this.onKeyDown);
      }
    }
    this.props.addMenuToNesting && this.props.addMenuToNesting(rootRef);
  }

  componentWillUnmount() {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;

    if (__BROWSER__) {
      document.removeEventListener('keydown', this.onKeyDown);
    }
    this.props.removeMenuFromNesting &&
      this.props.removeMenuFromNesting(rootRef);
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
      case KEY_STRINGS.Home:
      case KEY_STRINGS.End:
        this.handleArrowKey(event);
        break;
      case KEY_STRINGS.Enter:
        if (event.keyCode === 229) {
          // ref.
          // https://github.com/JedWatson/react-select/blob/e12b42b0e7598ec4a96a1a6480e0b2b4c7dc03e3/packages/react-select/src/Select.js#L1209
          break;
        }
        this.handleEnterKey(event);
        break;
    }
  };

  // Handler for arrow keys
  handleArrowKey = (event: KeyboardEvent) => {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
    const prevIndex = this.state.highlightedIndex;
    let nextIndex = prevIndex;

    if (event.key === KEY_STRINGS.ArrowUp) {
      event.preventDefault();
      nextIndex = Math.max(0, prevIndex - 1);
      this.internalSetState(STATE_CHANGE_TYPES.moveUp, {
        highlightedIndex: nextIndex,
      });
    } else if (event.key === KEY_STRINGS.ArrowDown) {
      event.preventDefault();
      nextIndex = Math.min(prevIndex + 1, this.getItems().length - 1);
      this.internalSetState(STATE_CHANGE_TYPES.moveDown, {
        highlightedIndex: nextIndex,
      });
    } else if (event.key === KEY_STRINGS.Home) {
      event.preventDefault();
      nextIndex = 0;
      this.internalSetState(STATE_CHANGE_TYPES.moveUp, {
        highlightedIndex: nextIndex,
      });
    } else if (event.key === KEY_STRINGS.End) {
      event.preventDefault();
      nextIndex = this.getItems().length - 1;
      this.internalSetState(STATE_CHANGE_TYPES.moveDown, {
        highlightedIndex: nextIndex,
      });
    } else if (event.key === KEY_STRINGS.ArrowLeft) {
      if (this.props.getParentMenu) {
        const parent = this.props.getParentMenu(rootRef);
        if (parent && parent.current) {
          parent.current.focus();
        }
      }
    } else if (event.key === KEY_STRINGS.ArrowRight) {
      if (this.props.getChildMenu) {
        const child = this.props.getChildMenu(rootRef);
        if (child && child.current) {
          child.current.focus();
        }
      }
    }
    if (this.refList[nextIndex]) {
      scrollItemIntoView(
        this.refList[nextIndex].current,
        // $FlowFixMe
        rootRef.current,
        nextIndex === 0,
        nextIndex === this.getItems().length - 1,
      );
    }
  };

  // Handler for enter key
  handleEnterKey = (event: KeyboardEvent) => {
    const {onItemSelect} = this.props;
    const {highlightedIndex} = this.state;
    const items = this.getItems();
    if (
      items[highlightedIndex] &&
      onItemSelect &&
      !items[highlightedIndex].disabled
    ) {
      onItemSelect({item: items[highlightedIndex], event});
    }
  };

  handleItemClick = (
    activedescendantId: ?string,
    index: number,
    item: *,
    event: SyntheticMouseEvent<HTMLElement>,
  ) => {
    if (this.props.onItemSelect && !item.disabled) {
      this.props.onItemSelect({item, event});
      this.internalSetState(STATE_CHANGE_TYPES.click, {
        highlightedIndex: index,
        activedescendantId,
      });
    }
  };

  handleMouseEnter = (activedescendantId: ?string, index: number) => {
    this.internalSetState(STATE_CHANGE_TYPES.mouseEnter, {
      highlightedIndex: index,
      activedescendantId,
    });
  };

  getRequiredItemProps: GetRequiredItemPropsFnT = (item, index) => {
    let itemRef = this.refList[index];
    if (!itemRef) {
      itemRef = React.createRef();
      this.refList[index] = itemRef;
    }
    const requiredItemProps = this.props.getRequiredItemProps(item, index);
    const activedescendantId = requiredItemProps.id || null;
    if (
      this.state.highlightedIndex === index &&
      this.state.activedescendantId !== activedescendantId
    ) {
      this.setState({activedescendantId});
    }
    return {
      disabled: !!item.disabled,
      ref: itemRef,
      isFocused: this.state.isFocused,
      isHighlighted: this.state.highlightedIndex === index,
      // binds so that in-line functions can be avoided. this is to ensure
      // referential equality when option-list compares props in memoized compoent
      onClick: this.handleItemClick.bind(this, activedescendantId, index, item),
      onMouseEnter: this.handleMouseEnter.bind(this, activedescendantId, index),
      resetMenu: this.resetMenu,
      ...(this.state.highlightedIndex === index
        ? {id: activedescendantId}
        : {}),
      ...requiredItemProps,
    };
  };

  focusMenu = (event: FocusEvent | MouseEvent | KeyboardEvent) => {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;

    if (this.state.isFocused) {
      return;
    }
    // $FlowFixMe
    if (rootRef.current && rootRef.current.contains(event.target)) {
      if (this.state.highlightedIndex < 0) {
        this.internalSetState(STATE_CHANGE_TYPES.focus, {
          isFocused: true,
          highlightedIndex: 0,
        });
      } else {
        this.internalSetState(STATE_CHANGE_TYPES.focus, {isFocused: true});
      }

      rootRef.current.focus();
    }
  };

  unfocusMenu = () => {
    this.internalSetState(STATE_CHANGE_TYPES.focus, {isFocused: false});
  };

  resetMenu = () => {
    this.internalSetState(STATE_CHANGE_TYPES.reset, {
      isFocused: false,
      highlightedIndex: -1,
      activedescendantId: null,
    });
  };

  render() {
    // omit the stateful-container's props and don't pass it down
    // to the children (stateless menu)
    const {
      initialState,
      stateReducer,
      children,
      onItemSelect,
      addMenuToNesting,
      removeMenuFromNesting,
      getParentMenu,
      getChildMenu,
      ...restProps
    } = this.props;
    return this.props.children(
      ({
        ...restProps,
        rootRef: this.props.rootRef ? this.props.rootRef : this.rootRef,
        activedescendantId: this.state.activedescendantId,
        getRequiredItemProps: this.getRequiredItemProps,
        highlightedIndex: this.state.highlightedIndex,
        isFocused: this.state.isFocused,
        focusMenu: this.focusMenu,
        unfocusMenu: this.unfocusMenu,
      }: RenderPropsT),
    );
  }
}
