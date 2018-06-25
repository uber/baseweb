// @flow
import * as React from 'react';
import document from 'global/document';
// Files
import {STATE_CHANGE_TYPES, KEY_STRINGS} from './constants';
import {scrollItemIntoView} from './utils';
// Types
import type {
  StatefulContainerProps,
  DefaultStatefulContainerProps,
  StatefulContainerState,
  GetRequiredItemPropsFn,
  RootRef,
  RenderProps,
} from './types';

export default class MenuListStatefulContainer extends React.Component<
  StatefulContainerProps,
  StatefulContainerState,
> {
  static defaultProps: DefaultStatefulContainerProps = {
    initialState: {
      // We start the index at -1 to indicate that no highlighting exists initially
      highlightedIndex: -1,
    },
    stateReducer: (changeType, changes) => changes,
    onItemSelect: () => {},
    children: () => {},
  };

  state: StatefulContainerState = {...this.props.initialState};

  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  // One array to hold all of list item refs
  _refs: Array<React$ElementRef<*>> = [];

  // We need to have access to the root component user renders
  // to correctly facilitate keyboard scrolling behavior
  _rootRef: RootRef = React.createRef();

  // Internal set state function that will also invoke stateReducer
  _setInternalState(
    changeType: ?$Keys<typeof STATE_CHANGE_TYPES>,
    changes: StatefulContainerState,
  ) {
    const {stateReducer} = this.props;
    // $FlowFixMe
    this.setState(stateReducer(changeType, changes, this.state));
  }

  // Regular type here because this is not done through React
  _onKeyDown = (event: KeyboardEvent) => {
    // Up arrow
    switch (event.key) {
      case KEY_STRINGS.ArrowUp:
      case KEY_STRINGS.ArrowDown:
        this._handleArrowKey(event.key);
        event.preventDefault();
        break;
      case KEY_STRINGS.Enter:
        this._handleEnterKey();
        event.preventDefault();
        break;
    }
  };

  // Handler for arrow keys
  _handleArrowKey(key: string) {
    const {items} = this.props;
    const {highlightedIndex: oldIndex} = this.state;
    let highlightedIndex = oldIndex;
    let stateChangeType = null;
    if (key === KEY_STRINGS.ArrowUp) {
      highlightedIndex = Math.max(0, oldIndex - 1);
      stateChangeType = STATE_CHANGE_TYPES.keyPressArrowUp;
    } else if (key === KEY_STRINGS.ArrowDown) {
      highlightedIndex = Math.min(oldIndex + 1, items.length - 1);
      stateChangeType = STATE_CHANGE_TYPES.keyPressArrowDown;
    }
    scrollItemIntoView({
      node: this._refs[highlightedIndex],
      parentNode: this._rootRef,
      isFirst: highlightedIndex === 0,
      isLast: highlightedIndex === items.length - 1,
    });
    this._setInternalState(stateChangeType, {highlightedIndex});
  }

  // Handler for enter key
  _handleEnterKey() {
    const {items, onItemSelect} = this.props;
    const {highlightedIndex} = this.state;
    if (items[highlightedIndex] && onItemSelect) {
      // Flow sucks at if statement checks
      // $FlowFixMe
      onItemSelect(items[highlightedIndex]);
    }
  }

  _getRequiredItemProps: GetRequiredItemPropsFn = (item, index) => {
    const {highlightedIndex} = this.state;
    const {getItemString, onItemSelect} = this.props;
    const itemString = getItemString(item);
    // Create and store ref or re-use
    let itemRef = this._refs[index];
    if (!itemRef) {
      itemRef = React.createRef();
      this._refs[index] = itemRef;
    }
    return {
      key: `${itemString}-${index}`,
      ref: itemRef,
      isHighlighted: highlightedIndex === index,
      // $FlowFixMe
      onClick: onItemSelect.bind(null, item),
      role: 'option',
      'aria-activedescendant': highlightedIndex === index,
    };
  };

  render() {
    const {highlightedIndex} = this.state;
    const {children, items, getItemString} = this.props;
    // $FlowFixMe
    return children(
      ({
        highlightedIndex,
        items,
        getItemString,
        rootRef: this._rootRef,
        getRequiredItemProps: this._getRequiredItemProps,
      }: RenderProps),
    );
  }
}
