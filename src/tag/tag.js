/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {getOverrides} from '../helpers/overrides';
import type {PropsT} from './types';
import {
  Action as StyledAction,
  Root as StyledRoot,
  ActionIcon as StyledActionIcon,
} from './styled-components';
import {STYLE} from './constants';

class Tag extends React.Component<PropsT, {}> {
  static defaultProps = {
    overrides: {},
    onActionClick: () => {},
    color: STYLE.primary,
    disabled: false,
    isFocused: false,
    isHovered: false,
  };

  render() {
    const {
      overrides = {},
      disabled,
      isFocused,
      isHovered,
      children,
      onActionClick,
      color,
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Action, actionProps] = getOverrides(overrides.Action, StyledAction);
    const [ActionIcon, actionIconProps] = getOverrides(
      overrides.ActionIcon,
      StyledActionIcon,
    );
    const sharedProps = {
      $isFocused: isFocused,
      $isHovered: isHovered,
      $disabled: disabled,
      $color: color,
    };
    const events = disabled
      ? {}
      : {
          onClick: e => onActionClick(e, children),
        };
    return (
      <Root {...sharedProps} {...rootProps}>
        {children}
        <Action {...sharedProps} {...actionProps} {...events}>
          <ActionIcon
            width={'8'}
            height={'8'}
            viewBox={'0 0 8 8'}
            fill={'none'}
            xmlns={'http://www.w3.org/2000/svg'}
            {...actionIconProps}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.861278 0.862254C1.12163 0.601905 1.54374 0.601905 1.80409 0.862254L3.99935 3.05752L6.19461 0.862254C6.45496 0.601905 6.87707 0.601905 7.13742 0.862254C7.39777 1.1226 7.39777 1.54471 7.13742 1.80506L4.94216 4.00033L7.13742 6.19559C7.39777 6.45594 7.39777 6.87805 7.13742 7.1384C6.87707 7.39875 6.45496 7.39875 6.19461 7.1384L3.99935 4.94313L1.80409 7.1384C1.54374 7.39875 1.12163 7.39875 0.861278 7.1384C0.600928 6.87805 0.600928 6.45594 0.861278 6.19559L3.05654 4.00033L0.861278 1.80506C0.600928 1.54471 0.600928 1.1226 0.861278 0.862254Z"
              fill={color}
            />
          </ActionIcon>
        </Action>
      </Root>
    );
  }
}

export default Tag;
