/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {LocaleContext} from '../locale/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import PlusIcon from '../icon/plus.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import {
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ToggleIcon as StyledToggleIcon,
} from './styled-components.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

import type {PanelPropsT, SharedStylePropsArgT} from './types.js';

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

    const ENTER = 13;
    const SPACE = 32;

    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      typeof onChange === 'function' && onChange({expanded: !expanded});
      if (e.keyCode === SPACE) {
        e.preventDefault(); // prevent jumping scroll when using Space
      }
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
    const {
      PanelContainer: PanelContainerOverride,
      Header: HeaderOverride,
      Content: ContentOverride,
      ToggleIcon: ToggleIconOverride,
    } = overrides;

    const [PanelContainer, panelContainerProps] = getOverrides(
      PanelContainerOverride,
      StyledPanelContainer,
    );
    const [Header, headerProps] = getOverrides(HeaderOverride, StyledHeader);
    const [Content, contentProps] = getOverrides(
      ContentOverride,
      StyledContent,
    );

    const toggleIconOverrides = mergeOverrides(
      {Svg: {component: StyledToggleIcon}},
      // $FlowFixMe
      {Svg: ToggleIconOverride},
    );

    return (
      <LocaleContext.Consumer>
        {locale => (
          <PanelContainer {...sharedProps} {...panelContainerProps}>
            <Header
              tabIndex={0}
              role="button"
              aria-expanded={expanded}
              aria-disabled={disabled || null}
              {...sharedProps}
              {...headerProps}
              {...(ariaControls ? {'aria-controls': ariaControls} : {})}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}
              onFocus={forkFocus(headerProps, this.handleFocus)}
              onBlur={forkBlur(headerProps, this.handleBlur)}
            >
              {title}
              {expanded ? (
                <CheckIndeterminateIcon
                  size={16}
                  title={locale.accordion.collapse}
                  {...sharedProps}
                  overrides={toggleIconOverrides}
                />
              ) : (
                <PlusIcon
                  size={16}
                  title={locale.accordion.expand}
                  {...sharedProps}
                  overrides={toggleIconOverrides}
                />
              )}
            </Header>
            <Content
              {...sharedProps}
              {...contentProps}
              {...(ariaControls ? {id: ariaControls} : {})}
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
