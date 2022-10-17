/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Button, KIND } from '../button';
import {
  StyledRoot,
  StyledNavContainer,
  StyledTitle,
  StyledAdditionalButtonsContainer,
} from './styled-components';
import { TYPE } from './constants';
import type { MobileHeaderProps } from './types';

const DefaultIconButton = ({ children, ...restProps }) => (
  <Button
    kind={KIND.tertiary}
    overrides={{
      BaseButton: {
        style: {
          height: '48px',
          width: '48px',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          marginRight: '8px',
        },
      },
    }}
    {...restProps}
  >
    {children}
  </Button>
);

export function MobileHeader({
  overrides = {},
  title,
  navButton,
  additionalButtons = [],
  type = TYPE.fixed,
  expanded = false,
}: MobileHeaderProps) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledTitle);
  const [NavContainer, navContainerProps] = getOverrides(
    overrides.NavContainer,
    StyledNavContainer
  );
  const [IconButton, iconButtonProps] = getOverrides(overrides.IconButton, DefaultIconButton);
  const [AdditionalButtonsContainer, additionalButtonsContainerProps] = getOverrides(
    overrides.AdditionalButtonsContainer,
    StyledAdditionalButtonsContainer
  );

  if (additionalButtons.length > 2 && __DEV__) {
    console.warn(
      `MobileHeader can only render two additional buttons. Received ${additionalButtons.length}`
    );
  }

  const { icon: NavButtonIcon, onClick: navButtonOnClick, ariaLabel: navButtonLabel } = navButton;

  return (
    <Root {...rootProps} $expanded={expanded}>
      <NavContainer $type={type} {...navContainerProps}>
        <IconButton onClick={navButtonOnClick} aria-label={navButtonLabel} {...iconButtonProps}>
          <NavButtonIcon size={32} />
        </IconButton>
      </NavContainer>

      <Title $type={type} {...titleProps}>
        {title}
      </Title>

      {additionalButtons.length > 0 && (
        <AdditionalButtonsContainer {...additionalButtonsContainerProps}>
          {additionalButtons.map((button, idx) => {
            const { icon: Icon, onClick, ariaLabel } = button;
            return (
              <IconButton onClick={onClick} aria-label={ariaLabel} {...iconButtonProps} key={idx}>
                <Icon size={32} />
              </IconButton>
            );
          })}
        </AdditionalButtonsContainer>
      )}
    </Root>
  );
}

export default MobileHeader;
