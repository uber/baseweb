/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Root as StyledRoot } from './styled-components';
import { STATE_CHANGE_TYPE } from './constants';
import type { AccordionProps, AccordionState, StateChangeType } from './types';

export default class Accordion extends React.Component<AccordionProps, AccordionState> {
  static defaultProps: Partial<AccordionProps> = {
    accordion: true,
    disabled: false,
    initialState: {
      expanded: [],
    },
    onChange: () => {},
    overrides: {},
    renderAll: false,
    stateReducer: (type, newState) => newState,
  };

  state = {
    expanded: [],
    ...this.props.initialState,
  };

  itemRefs: React.RefObject<HTMLDivElement>[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPanelChange(key: React.Key, onChange: (...args: any[]) => {}, ...args: Array<any>) {
    let activeKeys = this.state.expanded;
    const { accordion } = this.props;
    if (accordion) {
      activeKeys = activeKeys[0] === key ? [] : [key];
    } else {
      activeKeys = [...activeKeys];
      const index = activeKeys.indexOf(key);
      const wasExpanded = index > -1;
      if (wasExpanded) {
        // remove active state
        activeKeys.splice(index, 1);
      } else {
        activeKeys.push(key);
      }
    }
    const newState = { expanded: activeKeys };
    this.internalSetState(STATE_CHANGE_TYPE.expand, newState);
    // Call individual panel's onChange handler
    if (typeof onChange === 'function') onChange(...args);
  }

  internalSetState(type: StateChangeType, changes: AccordionState) {
    const { stateReducer, onChange } = this.props;
    const newState = stateReducer(type, changes, this.state);
    this.setState(newState);
    typeof onChange === 'function' && onChange(newState);
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.props.disabled) {
      return;
    }

    const itemRefs = this.itemRefs;

    const HOME = 36;
    const END = 35;
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;

    if (e.keyCode === HOME) {
      e.preventDefault();
      const firstItem = itemRefs[0];
      firstItem.current && firstItem.current.focus();
    }
    if (e.keyCode === END) {
      e.preventDefault();
      const lastItem = itemRefs[itemRefs.length - 1];
      lastItem.current && lastItem.current.focus();
    }
    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
      const activeItemIdx = itemRefs.findIndex((item) => item.current === document.activeElement);
      if (activeItemIdx > 0) {
        const prevItem = itemRefs[activeItemIdx - 1];
        prevItem.current && prevItem.current.focus();
      }
    }
    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
      const activeItemIdx = itemRefs.findIndex((item) => item.current === document.activeElement);
      if (activeItemIdx < itemRefs.length - 1) {
        const nextItem = itemRefs[activeItemIdx + 1];
        nextItem.current && nextItem.current.focus();
      }
    }
  }

  getItems() {
    const { expanded } = this.state;
    const { accordion, disabled, children, renderAll, overrides } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.Children.map(children, (child: any, index) => {
      if (!child) return;

      const itemRef = React.createRef<HTMLDivElement>();
      this.itemRefs.push(itemRef);

      // If there is no key provided use the panel order as a default key
      const key = child.key || String(index);
      let isExpanded = false;
      if (accordion) {
        isExpanded = expanded[0] === key;
      } else {
        isExpanded = expanded.includes(key);
      }

      const props = {
        key,
        ref: itemRef,
        expanded: isExpanded || child.props.expanded,
        accordion,
        renderAll,
        overrides: child.props.overrides || overrides,
        disabled: child.props.disabled || disabled,
        onChange: (...args) => this.onPanelChange(key, child.props.onChange, ...args),
      };
      return React.cloneElement(child, props);
    });
  }

  render() {
    const { overrides = {} } = this.props;
    const { Root: RootOverride } = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    return (
      <Root
        data-baseweb="accordion"
        $disabled={this.props.disabled}
        $isFocusVisible={false}
        onKeyDown={this.handleKeyDown.bind(this)}
        {...rootProps}
      >
        {this.getItems()}
      </Root>
    );
  }
}
