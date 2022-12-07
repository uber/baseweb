/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  StyledNumberStep,
  StyledNumberIcon,
  StyledContent,
  StyledContentTitle,
  StyledNumberContentTail,
  StyledContentDescription,
} from './styled-components';
import Check from '../icon/check';

import type { NumberedStepProps } from './types';

function NumberedStep({
  overrides = {},
  isCompleted,
  isActive,
  isLast,
  title,
  step,
  children,
}: NumberedStepProps) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledNumberStep);
  const [Icon, iconProps] = getOverrides(overrides.Icon, StyledNumberIcon);
  const [Tail, tailProps] = getOverrides(overrides.Tail, StyledNumberContentTail);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledContentTitle);
  const [Description, descriptionProps] = getOverrides(
    overrides.Description,
    StyledContentDescription
  );
  const [CheckIcon, checkIconProps] = getOverrides(overrides.Icon, Check);

  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
  };

  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <Root {...sharedProps} {...rootProps}>
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <Icon {...sharedProps} {...iconProps}>
        {!isCompleted && <span>{step}</span>}
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        {isCompleted && <CheckIcon size={28} {...checkIconProps} />}
      </Icon>
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

NumberedStep.defaultProps = {
  isCompleted: false,
  isLast: false,
};

export default NumberedStep;
