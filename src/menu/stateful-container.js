/*
Copyright (c) Uber Technologies, Inc.

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
  ItemT,
} from './types.js';
import {useUIDSeed} from 'react-uid';

const DEFAULT_PROPS = {
  // keeping it in defaultProps to satisfy Flow
  initialState: {
    // We start the index at -1 to indicate that no highlighting exists initially
    highlightedIndex: -1,
    isFocused: false,
  },
  typeAhead: true,
  keyboardControlNode: ({current: null}: {current: null | HTMLElement}),
  stateReducer: ((changeType, changes) => changes: StateReducerFnT),
  onItemSelect: () => {},
  getRequiredItemProps: () => ({}),
  children: () => null,
  // from nested-menus context
  addMenuToNesting: () => {},
  removeMenuFromNesting: () => {},
  getParentMenu: () => {},
  getChildMenu: () => {},
  nestedMenuHoverIndex: -1,
  isNestedMenuVisible: () => false,
  forceHighlight: false,
};

class MenuStatefulContainerInner extends React.Component<
  StatefulContainerPropsT & {uidSeed: (item: number) => string} & {
    getRequiredItemProps: GetRequiredItemPropsFnT,
  },
  StatefulContainerStateT,
> {
  static defaultProps = DEFAULT_PROPS;

  state: StatefulContainerStateT = {
    ...this.constructor.defaultProps.initialState,
    ...this.props.initialState,
  };

  // We need to have access to the root component user renders
  // to correctly facilitate keyboard scrolling behavior
  rootRef = (React.createRef<HTMLElement>(): {current: null | HTMLElement});
  keyboardControlNode = this.props.keyboardControlNode.current;
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
        rootRef.current &&
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
        if (this.keyboardControlNode) {
          this.keyboardControlNode.addEventListener('keydown', this.onKeyDown);
        }
      }
    }
    this.props.addMenuToNesting && this.props.addMenuToNesting(rootRef);
  }

  componentWillUnmount() {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;

    if (__BROWSER__) {
      if (this.keyboardControlNode)
        this.keyboardControlNode.removeEventListener('keydown', this.onKeyDown);
    }

    if (this.props.removeMenuFromNesting) {
      this.props.removeMenuFromNesting(rootRef);
    }
  }

  componentDidUpdate(
    prevProps: StatefulContainerPropsT,
    prevState: StatefulContainerStateT,
  ) {
    if (__BROWSER__) {
      if (!prevState.isFocused && this.state.isFocused) {
        if (this.keyboardControlNode)
          this.keyboardControlNode.addEventListener('keydown', this.onKeyDown);
      } else if (prevState.isFocused && !this.state.isFocused) {
        if (this.keyboardControlNode)
          this.keyboardControlNode.removeEventListener(
            'keydown',
            this.onKeyDown,
          );
      }
    }
    var range = this.getItems().length;
    if (
      this.props.forceHighlight &&
      this.state.highlightedIndex === -1 &&
      range > 0
    ) {
      this.internalSetState(STATE_CHANGE_TYPES.enter, {
        highlightedIndex: 0,
      });
    }
    if (range === 0 && this.state.highlightedIndex !== -1) {
      this.internalSetState(STATE_CHANGE_TYPES.enter, {
        highlightedIndex: -1,
      });
    } else if (this.state.highlightedIndex >= range) {
      this.internalSetState(STATE_CHANGE_TYPES.enter, {
        highlightedIndex: 0,
      });
    }

    if (
      this.props.isNestedMenuVisible &&
      this.props.nestedMenuHoverIndex !== prevProps.nestedMenuHoverIndex &&
      !this.props.isNestedMenuVisible(this.rootRef) &&
      !this.props.forceHighlight
    ) {
      this.setState({highlightedIndex: -1});
    }
  }

  // One array to hold all list item refs
  refList: Array<{current: null | HTMLElement}> = [];
  // list of ids applied to list items. used to set aria-activedescendant
  optionIds: string[] = [];
  //characters input from keyboard, will automatically be clear after some time
  typeAheadChars: string = '';
  //count time for each continuous keyboard input
  typeAheadTimeOut: null | TimeoutID = null;

  // Internal set state function that will also invoke stateReducer

  internalSetState(
    changeType: $Keys<typeof STATE_CHANGE_TYPES>,
    changes: $Shape<StatefulContainerStateT>,
  ) {
    const {stateReducer} = this.props;

    if (
      this.props.onActiveDescendantChange &&
      typeof changes.highlightedIndex === 'number' &&
      this.state.highlightedIndex !== changes.highlightedIndex
    ) {
      this.props.onActiveDescendantChange(
        this.optionIds[changes.highlightedIndex],
      );
    }

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
      default:
        if (this.props.typeAhead) {
          clearTimeout(this.typeAheadTimeOut);
          this.handleAlphaDown(event);
        }
        break;
    }
  };
  handleAlphaDown = (event: KeyboardEvent) => {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;
    const prevIndex = this.state.highlightedIndex;

    this.typeAheadChars += event.key;
    this.typeAheadTimeOut = setTimeout(() => {
      this.typeAheadChars = '';
    }, 500);

    var nextIndex = prevIndex;
    event.preventDefault();
    var list = this.getItems();
    if (list.length === 0 || !('label' in list[0])) return;

    var notMatch = true;
    for (let n = 0; n < list.length; n++) {
      let label = list[n].label;
      if (
        label &&
        label.toUpperCase &&
        label.toUpperCase().indexOf(this.typeAheadChars.toUpperCase()) === 0
      ) {
        nextIndex = n;
        notMatch = false;
        break;
      }
    }

    if (notMatch) {
      for (let n = 0; n < list.length; n++) {
        let label = list[n].label;
        if (
          label &&
          label.toUpperCase &&
          label.toUpperCase().indexOf(this.typeAheadChars.toUpperCase()) > 0
        ) {
          nextIndex = n;
          break;
        }
      }
    }
    this.internalSetState(STATE_CHANGE_TYPES.character, {
      highlightedIndex: nextIndex,
    });

    if (this.refList[nextIndex]) {
      scrollItemIntoView(
        this.refList[nextIndex].current,
        // $FlowFixMe
        rootRef.current,
        nextIndex === 0,
        nextIndex === list.length - 1,
      );
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
      event.preventDefault();
      onItemSelect({item: items[highlightedIndex], event});
    }
  };

  handleItemClick = (
    index: number,
    item: ItemT,
    event: SyntheticMouseEvent<HTMLElement>,
  ) => {
    if (this.props.onItemSelect && !item.disabled) {
      this.props.onItemSelect({item, event});
      this.internalSetState(STATE_CHANGE_TYPES.click, {
        highlightedIndex: index,
        activedescendantId: this.optionIds[index],
      });
    }
  };

  handleMouseEnter = (index: number) => {
    this.internalSetState(STATE_CHANGE_TYPES.mouseEnter, {
      highlightedIndex: index,
      activedescendantId: this.optionIds[index],
    });
  };

  handleMouseLeave = (event: SyntheticMouseEvent<HTMLElement>) => {};

  getRequiredItemProps: GetRequiredItemPropsFnT = (item, index) => {
    let itemRef = this.refList[index];
    if (!itemRef) {
      itemRef = React.createRef();
      this.refList[index] = itemRef;
      this.optionIds[index] = this.props.uidSeed(index);
    }
    const {disabled: disabledVal, ...requiredItemProps} =
      this.props.getRequiredItemProps(item, index);
    const disabled =
      typeof disabledVal === 'boolean' ? disabledVal : !!item.disabled;
    return {
      id: requiredItemProps.id || this.optionIds[index],
      disabled,
      ref: itemRef,
      isFocused: this.state.isFocused,
      isHighlighted: this.state.highlightedIndex === index,
      resetMenu: this.resetMenu,
      // binds so that in-line functions can be avoided. this is to ensure
      // referential equality when option-list compares props in memoized component
      ...(disabled
        ? {}
        : {
            onClick: this.handleItemClick.bind(this, index, item),
            onMouseEnter: this.handleMouseEnter.bind(this, index),
          }),
      ...requiredItemProps,
    };
  };

  focusMenu = (event: FocusEvent | MouseEvent | KeyboardEvent) => {
    const rootRef = this.props.rootRef ? this.props.rootRef : this.rootRef;

    if (
      !this.state.isFocused &&
      rootRef.current &&
      // $FlowFixMe
      rootRef.current.contains(event.target)
    ) {
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
      forceHighlight,
      ...restProps
    } = this.props;

    return this.props.children(
      ({
        ...restProps,
        rootRef: this.props.rootRef ? this.props.rootRef : this.rootRef,
        activedescendantId: this.optionIds[this.state.highlightedIndex],
        getRequiredItemProps: (item, index) =>
          this.getRequiredItemProps(item, index),
        handleMouseLeave: this.handleMouseLeave,
        highlightedIndex: this.state.highlightedIndex,
        isFocused: this.state.isFocused,
        handleKeyDown: this.props.keyboardControlNode.current
          ? (event) => {}
          : this.onKeyDown,
        focusMenu: this.focusMenu,
        unfocusMenu: this.unfocusMenu,
      }: RenderPropsT),
    );
  }
}

// Remove when MenuStatefulContainer is converted to a functional component.
const MenuStatefulContainer = (props: StatefulContainerPropsT) => {
  //$FlowExpectedError[cannot-spread-inexact]
  return <MenuStatefulContainerInner uidSeed={useUIDSeed()} {...props} />;
};

MenuStatefulContainer.defaultProps = DEFAULT_PROPS;

export default MenuStatefulContainer;
