/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {
  StyledStep,
  StyledIconContainer,
  StyledIcon,
  StyledInnerIcon,
  StyledContent,
  StyledContentTitle,
  StyledContentTail,
  StyledContentDescription,
} from './styled-components.js';

import type {StepPropsT, StepPropsDefaultT} from './types.js';

function Step({
  overrides = {},
  isCompleted,
  isActive,
  isLast,
  title,
  children,
}: StepPropsT) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledStep);
  const [IconContainer, iconContainerProps] = getOverrides(
    overrides.IconContainer,
    StyledIconContainer,
  );
  const [Icon, iconProps] = getOverrides(overrides.Icon, StyledIcon);
  const [InnerIcon, innerIconProps] = getOverrides(
    overrides.InnerIcon,
    StyledInnerIcon,
  );
  const [Tail, tailProps] = getOverrides(overrides.Tail, StyledContentTail);
  const [Content, contentProps] = getOverrides(
    overrides.Content,
    StyledContent,
  );
  const [Title, titleProps] = getOverrides(overrides.Title, StyledContentTitle);
  const [Description, descriptionProps] = getOverrides(
    overrides.Description,
    StyledContentDescription,
  );

  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
  };

  return (
    <Root {...sharedProps} {...rootProps}>
      <IconContainer {...sharedProps} {...iconContainerProps}>
        <Icon {...sharedProps} {...iconProps}>
          {isActive && <InnerIcon {...innerIconProps} />}
        </Icon>
      </IconContainer>
      {!isLast && <Tail {...sharedProps} {...tailProps} />}
      <Content {...sharedProps} {...contentProps}>
        <Title {...sharedProps} {...titleProps}>
          {title}
        </Title>
        <Description {...descriptionProps}>{isActive && children}</Description>
      </Content>
    </Root>
  );
}

const defaultProps: StepPropsDefaultT = {
  isCompleted: false,
  isLast: false,
};

Step.defaultProps = defaultProps;

export default withOverrides<
  React.Config<StepPropsT, StepPropsDefaultT>,
  mixed,
>(Step, 'Step');
