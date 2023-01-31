/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { ButtonDockedProps } from './types';
import { StyledRoot, StyledActionContainer, StyledActionSubContainer } from './styled-components';
import { getOverrides } from '../helpers/overrides';

const ButtonDocked = (props: ButtonDockedProps) => {
  const { primaryAction, secondaryActions, dismissiveAction, topAccessory, overrides = {} } = props;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [ActionContainer, actionContainerProps] = getOverrides(
    overrides.ActionContainer,
    StyledActionContainer
  );
  const [ActionSubContainer, actionSubContainerProps] = getOverrides(
    overrides.ActionSubContainer,
    StyledActionSubContainer
  );

  return (
    <Root {...rootProps}>
      {topAccessory}
      <ActionContainer {...actionContainerProps}>
        <ActionSubContainer {...actionSubContainerProps}>{secondaryActions}</ActionSubContainer>
        <ActionSubContainer $reverseWhenWide {...actionSubContainerProps}>
          {primaryAction}
          {dismissiveAction}
        </ActionSubContainer>
      </ActionContainer>
    </Root>
  );
};

export default ButtonDocked;
