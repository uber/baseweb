/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {SIZE} from './constants.js';
import {
  StyledRoot,
  StyledBarContainer,
  StyledBar,
  StyledLabel,
  StyledBarProgress,
} from './styled-components.js';

import type {ProgressBarPropsT} from './types.js';

class ProgressBar extends React.Component<ProgressBarPropsT> {
  static defaultProps = {
    getProgressLabel: (value: number, successValue: number) =>
      `${Math.round((value / successValue) * 100)}% Loaded`,
    infinite: false,
    overrides: {},
    showLabel: false,
    size: SIZE.medium,
    stepped: 1,
    successValue: 100,
    value: 0,
  };

  render() {
    const {
      overrides = {},
      getProgressLabel,
      value,
      size,
      stepped,
      successValue,
      showLabel,
      infinite,
      errorMessage,
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [BarContainer, barContainerProps] = getOverrides(
      overrides.BarContainer,
      StyledBarContainer,
    );
    const [Bar, barProps] = getOverrides(overrides.Bar, StyledBar);
    const [BarProgress, barProgressProps] = getOverrides(
      overrides.BarProgress,
      StyledBarProgress,
    );
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const sharedProps = {
      $infinite: infinite,
      $size: size,
      $stepped: stepped,
      $successValue: successValue,
      $value: value,
    };
    function renderProgressBar() {
      const steps = [];
      if (stepped > 1) {
        for (let i = 0; i < stepped; i++) {
          steps.push(
            <Bar key={i} {...sharedProps} {...barProps}>
              <BarProgress $index={i} {...sharedProps} {...barProgressProps} />
            </Bar>,
          );
        }
      } else {
        steps.push(
          <Bar key={0} {...sharedProps} {...barProps}>
            <BarProgress {...sharedProps} {...barProgressProps} />
          </Bar>,
        );
      }
      return steps;
    }
    return (
      <Root
        data-baseweb="progress-bar"
        role="progressbar"
        aria-valuenow={infinite ? null : value}
        aria-valuemin={infinite ? null : 0}
        aria-valuemax={infinite ? null : successValue}
        aria-invalid={errorMessage ? true : null}
        aria-errormessage={errorMessage}
        {...sharedProps}
        {...rootProps}
      >
        <BarContainer {...sharedProps} {...barContainerProps}>
          {renderProgressBar()}
        </BarContainer>
        {showLabel && (
          <Label {...sharedProps} {...labelProps}>
            {getProgressLabel(value, successValue)}
          </Label>
        )}
      </Root>
    );
  }
}

export default ProgressBar;
