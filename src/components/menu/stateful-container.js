// @flow
import * as React from 'react';
// Files
import {STATE_CHANGE_TYPES, KEY_STRINGS} from './constants';
import {scrollItemIntoView} from './utils';
// Types
import type {
  StatefulContainerPropsT,
  DefaultStatefulContainerPropsT,
  StatefulContainerStateT,
  GetRequiredItemPropsFnT,
  RootRefT,
  RenderPropsT,
} from './types';

export default class MenuStatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StatefulContainerStateT,
> {
  static defaultProps: DefaultStatefulContainerPropsT = {
    initialState: {
      // We start the index at -1 to indicate that no highlighting exists initially
      highlightedIndex: -1,
    },
    stateReducer: (changeType, changes) => changes,
    onItemSelect: () => {},
    children: () => {},
  };

  state: StatefulContainerStateT = {...this.props.initialState};

  componentDidMount() {
    if (__BROWSER__) {
      // TODO: perhaps only bind event listener on focus
      document.addEventListener('keydown', this.onKeyDown);
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
    // $FlowFixMe
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
      onItemSelect(items[highlightedIndex], event);
    }
  }

  getRequiredItemProps: GetRequiredItemPropsFnT = (item, index) => {
    const {highlightedIndex} = this.state;
    const {getItemLabel, onItemSelect} = this.props;
    const itemString = getItemLabel(item);
    // Create and store ref or re-use
    let itemRef = this.refList[index];
    if (!itemRef) {
      itemRef = React.createRef();
      this.refList[index] = itemRef;
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
    const {children, items, getItemLabel} = this.props;
    // $FlowFixMe
    return children(
      ({
        highlightedIndex,
        items,
        getItemLabel,
        rootRef: this.rootRef,
        getRequiredItemProps: this.getRequiredItemProps,
      }: RenderPropsT),
    );
  }
}
