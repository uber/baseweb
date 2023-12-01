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
import { ORIENTATION } from './constants';

function NumberedStep({
  overrides = {},
  isCompleted,
  isActive,
  isRightBeforeActive,
  isLast,
  orientation = ORIENTATION.vertical,
  title,
  step,
  alwaysShowDescription,
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
    $isRightBeforeActive: isRightBeforeActive,
    $orientation: orientation,
  };

  return (
    <>
      <Root {...sharedProps} {...rootProps}>
        <Icon {...sharedProps} {...iconProps}>
          {!isCompleted && <span>{step}</span>}

          {isCompleted && <CheckIcon size={30} {...checkIconProps} />}
        </Icon>

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

NumberedStep.defaultProps = {
  isCompleted: false,
  isLast: false,
};

export default NumberedStep;
