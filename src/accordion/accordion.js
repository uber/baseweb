/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {Root as StyledRoot} from './styled-components.js';
import {STATE_CHANGE_TYPE} from './constants.js';
import type {
  AccordionPropsT,
  AccordionStateT,
  StateChangeTypeT,
  SharedStylePropsArgT,
} from './types.js';

export default class Accordion extends React.Component<
  AccordionPropsT,
  AccordionStateT,
> {
  static defaultProps: $Shape<AccordionPropsT> = {
    accordion: true,
    disabled: false,
    initialState: {
      expanded: [],
    },
    renderPanelContent: false,
    renderAll: false,
    onChange: () => {},
    overrides: {},
    stateReducer: (type, newState) => newState,
  };

  state = {
    expanded: [],
    ...this.props.initialState,
  };

  onPanelChange(key: React.Key, onChange: () => {}, ...args: *) {
    let activeKeys = this.state.expanded;
    const {accordion} = this.props;
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
    const newState = {expanded: activeKeys};
    this.internalSetState(STATE_CHANGE_TYPE.expand, newState);
    if (typeof onChange === 'function') onChange(...args);
  }

  internalSetState(type: StateChangeTypeT, changes: AccordionStateT) {
    const {stateReducer, onChange} = this.props;
    const newState = stateReducer(type, changes, this.state);
    this.setState(newState);
    typeof onChange === 'function' && onChange(newState);
  }

  getItems() {
    const {expanded} = this.state;
    const {
      accordion,
      disabled,
      children,
      renderPanelContent,
      renderAll,
      overrides,
    } = this.props;
    // eslint-disable-next-line flowtype/no-weak-types
    const newChildren = React.Children.map(children, (child: *, index) => {
      if (!child) return;
      // If there is no key provide, use the panel order as default key
      const key = child.key || String(index);
      let isExpanded = false;
      if (accordion) {
        isExpanded = expanded[0] === key;
      } else {
        isExpanded = expanded.indexOf(key) > -1;
      }

      const props = {
        key,
        expanded: isExpanded || child.props.expanded,
        accordion,
        renderPanelContent,
        renderAll,
        overrides: child.props.overrides || overrides,
        disabled: child.props.disabled || disabled,
        onChange: (...args) =>
          this.onPanelChange(key, child.props.onChange, ...args),
      };
      return React.cloneElement(child, props);
    });
    return newChildren;
  }

  getSharedProps(): SharedStylePropsArgT {
    const {disabled} = this.props;
    return {
      $disabled: disabled,
    };
  }

  componentDidMount() {
    // TODO(v10)
    if (__DEV__ && this.props.renderPanelContent) {
      console.warn(
        'baseui:Accordion The `renderPanelContent` prop is depreacated. Please update your code to use `renderAll`.',
      );
    }
  }

  render() {
    const sharedProps = this.getSharedProps();
    const {overrides = {}} = this.props;
    const {Root: RootOverride} = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    return (
      <Root data-baseweb="accordion" {...sharedProps} {...rootProps}>
        {this.getItems()}
      </Root>
    );
  }
}
