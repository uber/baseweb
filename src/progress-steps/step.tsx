/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  StyledStep,
  StyledIconContainer,
  StyledIcon,
  StyledInnerIcon,
  StyledContent,
  StyledContentTitle,
  StyledContentTail,
  StyledContentDescription,
} from './styled-components';

import type { StepProps } from './types';

function Step({ overrides = {}, isCompleted, isActive, isLast, title, children }: StepProps) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledStep);
  const [IconContainer, iconContainerProps] = getOverrides(
    overrides.IconContainer,
    StyledIconContainer
  );
  const [Icon, iconProps] = getOverrides(overrides.Icon, StyledIcon);
  const [InnerIcon, innerIconProps] = getOverrides(overrides.InnerIcon, StyledInnerIcon);
  const [Tail, tailProps] = getOverrides(overrides.Tail, StyledContentTail);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledContentTitle);
  const [Description, descriptionProps] = getOverrides(
    overrides.Description,
    StyledContentDescription
  );

  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
  };

  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <Root {...sharedProps} {...rootProps}>
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <IconContainer {...sharedProps} {...iconContainerProps}>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Icon {...sharedProps} {...iconProps}>
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          {isActive && <InnerIcon {...innerIconProps} />}
        </Icon>
      </IconContainer>
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      {!isLast && <Tail {...sharedProps} {...tailProps} />}
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <Content {...sharedProps} {...contentProps}>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Title {...sharedProps} {...titleProps}>
          {title}
        </Title>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Description {...descriptionProps}>{isActive && children}</Description>
      </Content>
    </Root>
  );
}

Step.defaultProps = {
  isCompleted: false,
  isLast: false,
};

export default Step;
