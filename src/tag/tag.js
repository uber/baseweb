/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {
  Action as StyledAction,
  Root as StyledRoot,
  ActionIcon as StyledActionIcon,
  Text as StyledText,
} from './styled-components.js';
import {KIND, VARIANT, SIZE} from './constants.js';
import {getTextFromChildren} from './utils.js';
import type {PropsT, SharedPropsArgT} from './types.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

const Tag = React.forwardRef<PropsT, HTMLSpanElement>((props, ref) => {
  const {
    children,
    closeable = true,
    color,
    size = SIZE.small,
    disabled = false,
    isFocused = false,
    isHovered = false,
    kind = KIND.primary,
    onActionClick = event => {},
    onActionKeyDown = event => {},
    onClick = null,
    onKeyDown = null,
    overrides = {},
    title,
    variant = VARIANT.light,
  } = props;
  const [focusVisible, setFocusVisible] = React.useState(false);

  function handleFocus(event: SyntheticEvent<>) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }

  function handleBlur(event: SyntheticEvent<>) {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.currentTarget !== event.target) {
      return;
    }
    const key = event.key;
    if (onClick && key === 'Enter') {
      onClick(event);
    }
    if (closeable && (key === 'Backspace' || key === 'Delete')) {
      onActionClick(event);
      onActionKeyDown(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Action, actionProps] = getOverrides(overrides.Action, StyledAction);
  const [ActionIcon, actionIconProps] = getOverrides(
    overrides.ActionIcon,
    StyledActionIcon,
  );
  const [Text, textProps] = getOverrides(overrides.Text, StyledText);
  const clickable = typeof onClick === 'function';
  const rootHandlers = disabled
    ? {}
    : {
        onClick: onClick,
        onKeyDown: handleKeyDown,
      };
  const actionHandlers = disabled
    ? {}
    : {
        onClick: event => {
          // we don't want onClick to be called when the close icon is clicked
          event.stopPropagation();
          onActionClick(event);
        },
      };
  const sharedProps: SharedPropsArgT = {
    $clickable: clickable,
    $closeable: closeable,
    $color: color,
    $disabled: disabled,
    $isFocused: isFocused,
    $isHovered: isHovered,
    $kind: kind,
    $variant: variant,
    $isFocusVisible: focusVisible,
    $size: size,
  };
  const titleText = title || getTextFromChildren(children);
  const isButton = (clickable || closeable) && !disabled;
  const actionSize = {
    [SIZE.small]: '12',
    [SIZE.medium]: '16',
    [SIZE.large]: '20',
  }[size];
  return (
    <Root
      // eslint-disable-next-line flowtype/no-weak-types
      ref={(ref: any)}
      data-baseweb="tag"
      aria-label={
        isButton && closeable
          ? `${
              typeof children === 'string' ? `${children}, ` : ''
            }close by backspace`
          : null
      }
      aria-disabled={disabled ? true : null}
      role={isButton ? 'button' : null}
      tabIndex={isButton ? 0 : null}
      {...rootHandlers}
      {...sharedProps}
      {...rootProps}
      onFocus={forkFocus(rootProps, handleFocus)}
      onBlur={forkBlur(rootProps, handleBlur)}
    >
      <Text title={titleText} {...textProps}>
        {children}
      </Text>
      {closeable ? (
        <Action
          aria-hidden={true}
          role="presentation"
          {...actionHandlers}
          {...sharedProps}
          {...actionProps}
        >
          <ActionIcon
            width={actionSize}
            height={actionSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...actionIconProps}
          >
            <path
              fill="currentColor"
              d="M21.0999 5.09998L18.8999 2.90002L11.9999 9.90002L5.09985 2.90002L2.8999 5.09998L9.8999 12L2.8999 18.9L5.09985 21.1L11.9999 14.1L18.8999 21.1L21.0999 18.9L14.0999 12L21.0999 5.09998Z"
            />
          </ActionIcon>
        </Action>
      ) : null}
    </Root>
  );
});
Tag.displayName = 'Tag';

export default withOverrides(Tag, 'Tag');
