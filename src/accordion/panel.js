/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {LocaleContext} from '../locale/index.js';
import {Override} from '../helpers/override.js';
import PlusIcon from '../icon/plus.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

import {
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ToggleIcon as StyledToggleIcon,
} from './styled-components.js';
import type {PanelPropsT, SharedStylePropsArgT} from './types.js';

const PanelContainer = Override(StyledPanelContainer);
const Header = Override(StyledHeader);
const Content = Override(StyledContent);

class Panel extends React.Component<PanelPropsT, {isFocusVisible: boolean}> {
  static defaultProps = {
    disabled: false,
    expanded: false,
    onChange: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    title: '',
  };

  state = {isFocusVisible: false};

  handleFocus = (event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      this.setState({isFocusVisible: true});
    }
  };

  handleBlur = (event: SyntheticEvent<>) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({isFocusVisible: false});
    }
  };

  onClick = (e: Event) => {
    const {disabled, expanded, onChange, onClick} = this.props;
    if (disabled) {
      return;
    }
    typeof onChange === 'function' && onChange({expanded: !expanded});
    typeof onClick === 'function' && onClick(e);
    return;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const {disabled, expanded, onChange, onKeyDown} = this.props;
    if (disabled) {
      return;
    }
    // toggle on Enter or Space button pressed
    if (e.key === 'Enter' || e.which === 32) {
      typeof onChange === 'function' && onChange({expanded: !expanded});
      e.which === 32 && e.preventDefault(); // prevent jumping scroll when using Space
    }
    typeof onKeyDown === 'function' && onKeyDown(e);
    return;
  };

  getSharedProps(): SharedStylePropsArgT {
    const {disabled, expanded} = this.props;
    return {
      $disabled: disabled,
      $expanded: expanded,
      $isFocusVisible: this.state.isFocusVisible,
    };
  }

  render() {
    const {
      expanded,
      disabled,
      overrides = {},
      children,
      'aria-controls': ariaControls,
      title,
      renderPanelContent,
      renderAll,
    } = this.props;

    const sharedProps = this.getSharedProps();
    const ToggleIconComponent = expanded ? CheckIndeterminateIcon : PlusIcon;

    return (
      <LocaleContext.Consumer>
        {locale => (
          <PanelContainer {...sharedProps} override={overrides.PanelContainer}>
            <Header
              tabIndex={0}
              role="button"
              aria-expanded={expanded}
              aria-disabled={disabled || null}
              {...sharedProps}
              {...(ariaControls ? {'aria-controls': ariaControls} : {})}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}
              onFocus={
                overrides.Header && overrides.Header.props
                  ? forkFocus(overrides.Header.props, this.handleFocus)
                  : this.handleFocus
              }
              onBlur={
                overrides.Header && overrides.Header.props
                  ? forkBlur(overrides.Header.props, this.handleBlur)
                  : this.handleBlur
              }
              override={overrides.Header}
            >
              {title}
              <ToggleIconComponent
                size={16}
                title={
                  expanded ? locale.accordion.collapse : locale.accordion.expand
                }
                {...sharedProps}
                // $FlowFixMe Icon svg override does not have same props type
                overrides={{Svg: overrides.ToggleIcon}}
              />
            </Header>
            <Content
              {...sharedProps}
              {...(ariaControls ? {id: ariaControls} : {})}
              override={overrides.Content}
            >
              {expanded || renderPanelContent || renderAll ? children : null}
            </Content>
          </PanelContainer>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default Panel;
