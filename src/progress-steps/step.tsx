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
import { ORIENTATION } from './constants';

function Step({
  overrides = {},
  isCompleted,
  isCurrent,
  isActive,
  isRightBeforeActive,
  isLast = false,
  orientation = ORIENTATION.vertical,
  title,
  alwaysShowDescription,
  children,
}: StepProps) {
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
    $isCurrent: isCurrent,
    $isActive: isActive,
    $isRightBeforeActive: isRightBeforeActive,
    $orientation: orientation,
  };

  return (
    <>
      <Root {...sharedProps} {...rootProps}>
        <IconContainer {...sharedProps} {...iconContainerProps}>
          <Icon {...sharedProps} {...iconProps}>
            {isActive && <InnerIcon {...innerIconProps} />}
          </Icon>
        </IconContainer>

        {!isLast && orientation === ORIENTATION.vertical && (
          <Tail {...sharedProps} {...tailProps} />
        )}

        <Content {...sharedProps} {...contentProps}>
          <Title {...sharedProps} {...titleProps}>
            {title}
          </Title>

          <Description {...descriptionProps}>
            {(isActive || alwaysShowDescription) && children}
          </Description>
        </Content>
      </Root>

      {!isLast && orientation === ORIENTATION.horizontal && (
        <Tail {...sharedProps} {...tailProps} aria-hidden="true" />
      )}
    </>
  );
}

export default Step;
