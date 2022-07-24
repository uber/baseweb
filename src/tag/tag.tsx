/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  Action as StyledAction,
  Root as StyledRoot,
  StartEnhancerContainer as StyledStartEnhancerContainer,
  Text as StyledText,
} from './styled-components';
import { KIND, VARIANT, SIZE } from './constants';
import { getTextFromChildren } from './utils';
import type { TagProps, SharedPropsArg } from './types';
import DeleteIcon from '../icon/delete';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

// Previously, Tag used a hardcoded SVG as its 'close' icon. Replacing it with
// Delete requires modifying Delete's viewbox to prevent visual regressions.
const ModifiedViewBoxDeleteIcon = (props) => <DeleteIcon viewBox="5 5 13.186 13.186" {...props} />;

const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const {
    children,
    closeable = true,
    color,
    size = SIZE.small,
    disabled = false,
    isFocused = false,
    isHovered = false,
    kind = KIND.primary,
    onActionClick = (event) => {},
    onActionKeyDown = (event) => {},
    onClick = null,
    onKeyDown = null,
    overrides = {},
    startEnhancer,
    title,
    variant = VARIANT.light,
  } = props;
  const [focusVisible, setFocusVisible] = React.useState(false);

  function handleFocus(event: SyntheticEvent) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }

  function handleBlur(event: SyntheticEvent) {
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
    ModifiedViewBoxDeleteIcon
  );
  const [StartEnhancerContainer, startEnhancerContainerProps] = getOverrides(
    overrides.StartEnhancerContainer,
    StyledStartEnhancerContainer
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
        onClick: (event) => {
          // we don't want onClick to be called when the close icon is clicked
          event.stopPropagation();
          onActionClick(event);
        },
      };
  const sharedProps: SharedPropsArg = {
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
    [SIZE.small]: 12,
    [SIZE.medium]: 16,
    [SIZE.large]: 20,
  }[size];

  // Capitalize for JSX
  const StartEnhancer = startEnhancer;

  return (
    <Root
      ref={ref as any}
      data-baseweb="tag"
      aria-label={
        isButton && closeable
          ? `${typeof children === 'string' ? `${children}, ` : ''}close by backspace`
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
      {StartEnhancer &&
        // @ts-expect-error todo(flow->ts) it is not expected to be a number
        StartEnhancer !== 0 && (
          <StartEnhancerContainer {...startEnhancerContainerProps}>
            <StartEnhancer />
          </StartEnhancerContainer>
        )}

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
          <ActionIcon size={actionSize} {...actionIconProps} />
        </Action>
      ) : null}
    </Root>
  );
});
Tag.displayName = 'Tag';

export default Tag;
