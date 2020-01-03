/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
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
    successValue: 100,
    value: 0,
    overrides: {},
    showLabel: false,
  };

  render() {
    const {
      overrides = {},
      getProgressLabel,
      value,
      successValue,
      showLabel,
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Bar, barProps] = getOverrides(overrides.Bar, StyledBar);
    const [BarProgress, barProgressProps] = getOverrides(
      overrides.BarProgress,
      StyledBarProgress,
    );
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const sharedProps = {
      $value: value,
      $successValue: successValue,
    };
    return (
      <Root
        data-baseweb="progress-bar"
        role="progressbar"
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
