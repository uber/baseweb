/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Tab as StyledTab } from './styled-components';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { TabProps, SharedStylePropsArg } from './types';

import type { SyntheticEvent } from 'react';

class TabComponent extends React.Component<
  TabProps,
  {
    isFocusVisible: boolean;
  }
> {
  static defaultProps = {
    disabled: false,
    expanded: false,
    onSelect: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    title: '',
  };

  state = { isFocusVisible: false };

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  onClick = (e: Event) => {
    const { disabled, onSelect, onClick } = this.props;
    if (disabled) {
      return;
    }
    typeof onClick === 'function' && onClick(e);
    typeof onSelect === 'function' && onSelect();
    return;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const { disabled, onSelect, onKeyDown } = this.props;
    if (disabled) {
      return;
    }
    typeof onKeyDown === 'function' && onKeyDown(e);
    // toggle on Enter or Space button pressed
    if (e.key === 'Enter' || e.which === 32) {
      typeof onSelect === 'function' && onSelect();
      e.which === 32 && e.preventDefault(); // prevent jumping scroll when using Space
    }
    return;
  };

  getSharedProps(): SharedStylePropsArg {
    const { disabled, active, $orientation } = this.props;
    return {
      $disabled: disabled,
      $active: active,
      $orientation: $orientation,
    };
  }

  render() {
    const { active, disabled, id, overrides = {}, children } = this.props;
    const sharedProps = this.getSharedProps();
    const { Tab: TabOverride } = overrides;
    const [Tab, tabProps] = getOverrides(TabOverride, StyledTab);

    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <Tab
        $isFocusVisible={this.state.isFocusVisible}
        tabIndex={disabled ? -1 : 0}
        role="tab"
        id={id}
        aria-selected={active}
        aria-disabled={disabled || null}
        {...sharedProps}
        {...tabProps}
        onFocus={forkFocus(tabProps, this.handleFocus)}
        onBlur={forkBlur(tabProps, this.handleBlur)}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </Tab>
    );
  }
}

export default TabComponent;
