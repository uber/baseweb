/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  StyledNumberStep,
  StyledNumberIcon,
  StyledContent,
  StyledContentTitle,
  StyledNumberContentTail,
  StyledContentDescription,
} from './styled-components.js';
import StyledCheckIcon from '../icon/check.js';

import type {NumberedStepPropsT} from './types.js';

function NumberedStep({
  overrides = {},
  isCompleted,
  isActive,
  isLast,
  title,
  step,
  children,
}: NumberedStepPropsT) {
  const [Root, rootProps] = getOverrides(
    overrides.NumberStep,
    StyledNumberStep,
  );
  const [Icon, iconProps] = getOverrides(
    overrides.NumberIcon,
    StyledNumberIcon,
  );
  const [Tail, tailProps] = getOverrides(
    overrides.NumberContentTail,
    StyledNumberContentTail,
  );
  const [Content, contentProps] = getOverrides(
    overrides.Content,
    StyledContent,
  );
  const [Title, titleProps] = getOverrides(
    overrides.ContentTitle,
    StyledContentTitle,
  );
  const [Description, descriptionProps] = getOverrides(
    overrides.ContentDescription,
    StyledContentDescription,
  );
  const [CheckIcon, checkIconProps] = getOverrides(
    overrides.CheckIcon,
    StyledCheckIcon,
  );

  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
  };

  return (
    <Root {...sharedProps} {...rootProps}>
      <Icon {...sharedProps} {...iconProps}>
        {!isCompleted && <span>{step}</span>}
        {isCompleted && <CheckIcon size={12} {...checkIconProps} />}
      </Icon>
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

NumberedStep.defaultProps = {
  isCompleted: false,
  isActive: false,
  isLast: false,
};

export default NumberedStep;
