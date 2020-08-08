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
  Root as StyledRoot,
  Bar as StyledBar,
  Label as StyledLabel,
  BarProgress as StyledBarProgress,
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
    successValue: 100,
    value: 0,
  };

  render() {
    const {
      overrides = {},
      getProgressLabel,
      value,
      size,
      successValue,
      showLabel,
      infinite,
      errorMessage,
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Bar, barProps] = getOverrides(overrides.Bar, StyledBar);
    const [BarProgress, barProgressProps] = getOverrides(
      overrides.BarProgress,
      StyledBarProgress,
    );
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const sharedProps = {
      $infinite: infinite,
      $size: size,
      $successValue: successValue,
      $value: value,
    };
    return (
      <Root
        data-baseweb="progress-bar"
        role="progressbar"
        aria-valuenow={infinite ? null : value}
        aria-valuemin={infinite ? null : 0}
        aria-valuemax={infinite ? null : 100}
        aria-invalid={errorMessage ? true : null}
        aria-errormessage={errorMessage}
        {...sharedProps}
        {...rootProps}
      >
        <Bar {...sharedProps} {...barProps}>
          <BarProgress {...sharedProps} {...barProgressProps} />
        </Bar>
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
