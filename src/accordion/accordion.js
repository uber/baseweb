/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable cup/no-undef */
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { Root as StyledRoot } from './styled-components.js';
import { STATE_CHANGE_TYPE } from './constants.js';
import type { AccordionPropsT, AccordionStateT, StateChangeTypeT } from './types.js';

export default class Accordion extends React.Component<AccordionPropsT, AccordionStateT> {
  static defaultProps: $Shape<AccordionPropsT> = {
    accordion: true,
    disabled: false,
    initialState: {
      expanded: [],
    },
    onChange: () => {},
    overrides: {},
    renderAll: false,
    renderPanelContent: false,
    stateReducer: (type, newState) => newState,
  };

  state = {
    expanded: [],
    ...this.props.initialState,
  };

  itemRefs = [];

  //flowlint-next-line unclear-type:off
  onPanelChange(key: React.Key, onChange: () => {}, ...args: Array<any>) {
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

  internalSetState(type: StateChangeTypeT, changes: AccordionStateT) {
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
      const firstItem = itemRefs[0];
      firstItem.current && firstItem.current.focus();
    }
    if (e.keyCode === END) {
      const lastItem = itemRefs[itemRefs.length - 1];
      lastItem.current && lastItem.current.focus();
    }
    if (e.keyCode === ARROW_UP) {
      const activeItemIdx = itemRefs.findIndex((item) => item.current === document.activeElement);
      if (activeItemIdx > 0) {
        const prevItem = itemRefs[activeItemIdx - 1];
        prevItem.current && prevItem.current.focus();
      }
    }
    if (e.keyCode === ARROW_DOWN) {
      const activeItemIdx = itemRefs.findIndex((item) => item.current === document.activeElement);
      if (activeItemIdx < itemRefs.length - 1) {
        const nextItem = itemRefs[activeItemIdx + 1];
        nextItem.current && nextItem.current.focus();
      }
    }
  }

  getItems() {
    const { expanded } = this.state;
    const { accordion, disabled, children, renderPanelContent, renderAll, overrides } = this.props;
    // flowlint-next-line unclear-type:off
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
        renderPanelContent,
        renderAll,
        overrides: child.props.overrides || overrides,
        disabled: child.props.disabled || disabled,
        onChange: (...args) => this.onPanelChange(key, child.props.onChange, ...args),
      };
      return React.cloneElement(child, props);
    });
  }

  componentDidMount() {
    // TODO(v11)
    if (__DEV__ && this.props.renderPanelContent) {
      console.warn(
        'baseui:Accordion The `renderPanelContent` prop is deprecated. Please update your code to use `renderAll`.'
      );
    }
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
