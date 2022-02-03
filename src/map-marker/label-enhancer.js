/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  RelativeContainer,
  StyledStrokedLabel,
  StyledStrokedLabelContainer,
} from './styled-components.js';
import {LABEL_ENHANCER_POSITIONS} from './constants.js';
import type {LabelEhancerComponentT} from './types.js';

const LabelEnhancer = ({
  labelEnhancerContent,
  labelEnhancerPosition,
  labelEnhancerColor,
  labelEnhancerStrokeColor,
  needleHeight,
  size,
  overrides = {},
}: LabelEhancerComponentT) => {
  if (
    !labelEnhancerPosition ||
    labelEnhancerPosition === LABEL_ENHANCER_POSITIONS.none
  ) {
    return null;
  }
  if (!labelEnhancerContent) {
    return null;
  }

  const [StrokedLabelContainer, strokedLabelContainerProps] = getOverrides(
    overrides.LabelEnhancerContainer,
    StyledStrokedLabelContainer,
  );

  const [StrokedLabel, strokedLabelProps] = getOverrides(
    overrides.LabelEnhancer,
    StyledStrokedLabel,
  );
  return (
    <StrokedLabelContainer
      $position={labelEnhancerPosition}
      $labelOffset={needleHeight}
      {...strokedLabelContainerProps}
    >
      <RelativeContainer>
        <StrokedLabel
          $color={labelEnhancerColor}
          $strokeColor={labelEnhancerStrokeColor}
          $size={size}
          {...strokedLabelProps}
        >
          {labelEnhancerContent}
        </StrokedLabel>
      </RelativeContainer>
    </StrokedLabelContainer>
  );
};

export default LabelEnhancer;
