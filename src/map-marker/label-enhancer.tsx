/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  RelativeContainer,
  StyledStrokedLabel,
  StyledStrokedLabelContainer,
} from './styled-components';
import { LABEL_ENHANCER_POSITIONS } from './constants';
import type { LabelEhancerComponent } from './types';

const LabelEnhancer = ({
  labelEnhancerContent,
  labelEnhancerPosition,
  needleHeight,
  size,
  overrides = {},
}: LabelEhancerComponent) => {
  if (!labelEnhancerPosition || labelEnhancerPosition === LABEL_ENHANCER_POSITIONS.none) {
    return null;
  }
  if (!labelEnhancerContent) {
    return null;
  }

  const [StrokedLabelContainer, strokedLabelContainerProps] = getOverrides(
    overrides.LabelEnhancerContainer,
    StyledStrokedLabelContainer
  );

  const [StrokedLabel, strokedLabelProps] = getOverrides(
    overrides.LabelEnhancer,
    StyledStrokedLabel
  );
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StrokedLabelContainer
      $position={labelEnhancerPosition}
      $labelOffset={needleHeight}
      {...strokedLabelContainerProps}
    >
      <RelativeContainer>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <StrokedLabel $size={size} {...strokedLabelProps}>
          {labelEnhancerContent}
        </StrokedLabel>
      </RelativeContainer>
    </StrokedLabelContainer>
  );
};

export default LabelEnhancer;
