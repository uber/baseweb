/*
Copyright (c) Uber Technologies, Inc.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Button, KIND, SHAPE } from '../button';
import {
  StyledRoot,
  StyledNavContainer,
  StyledTitle,
  StyledActionButtonsContainer,
} from './styled-components';
import { TYPE } from './constants';
import { useStyletron } from '../styles/index';
import type { MobileHeaderProps } from './types';

const renderButtonContent = (content) => {
  if (typeof content === 'string') {
    return content;
  }
  const Icon = content;
  return <Icon size={32} />;
};

const DefaultHeaderButton = ({ children, type, ...restProps }) => {
  const [, theme] = useStyletron();
  const isFloating = type === TYPE.floating;
  const hasTextContent = typeof children === 'string';
  const shouldHaveTrailingMargin = isFloating || !hasTextContent;
  const trailingMargin =
    theme.direction === 'rtl'
      ? { marginLeft: theme.sizing.scale300 }
      : { marginRight: theme.sizing.scale300 };

  const style = {
    ...(!hasTextContent
      ? {
          height: '48px',
          width: '48px',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }
      : {}),
    ...(shouldHaveTrailingMargin ? trailingMargin : {}),
    ...(isFloating ? { backgroundColor: theme.colors.backgroundPrimary } : {}),
  };

  return (
    <Button
      kind={KIND.tertiary}
      shape={SHAPE.pill}
      overrides={{
        BaseButton: {
          style,
        },
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export function MobileHeader({
  overrides = {},
  title,
  navButton,
  actionButtons = [],
  type = TYPE.fixed,
  expanded = false,
}: MobileHeaderProps) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledTitle);
  const [NavContainer, navContainerProps] = getOverrides(
    overrides.NavContainer,
    StyledNavContainer
  );
  const [HeaderButton, iconButtonProps] = getOverrides(overrides.HeaderButton, DefaultHeaderButton);
  const [ActionButtonsContainer, actionButtonsContainerProps] = getOverrides(
    overrides.ActionButtonsContainer,
    StyledActionButtonsContainer
  );

  if (actionButtons.length > 2 && __DEV__) {
    console.warn(
      `MobileHeader can only render two additional buttons. Received ${actionButtons.length}`
    );
  }

  return (
    <Root {...rootProps} $type={type} $expanded={expanded}>
      <NavContainer
        $type={type}
        $hasTextContent={navButton && !Boolean(navButton.renderIcon)}
        {...navContainerProps}
      >
        {navButton && (
          <HeaderButton
            onClick={navButton.onClick}
            type={type}
            aria-label={navButton.label}
            {...iconButtonProps}
          >
            {renderButtonContent(navButton.renderIcon || navButton.label)}
          </HeaderButton>
        )}
      </NavContainer>

      {type === TYPE.fixed && (
        <Title $type={type} $expanded={expanded} {...titleProps}>
          {title}
        </Title>
      )}

      {actionButtons.length > 0 && (
        <ActionButtonsContainer {...actionButtonsContainerProps}>
          {actionButtons.map((button, idx) => {
            // @ts-expect-error todo(ts-migration) TS2339 Property 'renderIcon' does not exist on type 'IconButton | undefined'.
            const { renderIcon, onClick, label } = button;
            return (
              <HeaderButton
                onClick={onClick}
                aria-label={label}
                type={type}
                {...iconButtonProps}
                key={idx}
              >
                {renderButtonContent(renderIcon || label)}
              </HeaderButton>
            );
          })}
        </ActionButtonsContainer>
      )}
    </Root>
  );
}

export default MobileHeader;
