/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {SIZE} from './constants.js';
import {
  StyledRoot,
  StyledBarContainer,
  StyledBar,
  StyledLabel,
  StyledBarProgress,
  StyledInfiniteBar,
} from './styled-components.js';

import type {ProgressBarPropsT, ProgressBarPropsDefaultT} from './types.js';

class ProgressBar extends React.Component<ProgressBarPropsT> {
  static defaultProps: ProgressBarPropsDefaultT = {
    getProgressLabel: (value: number, successValue: number) =>
      `${Math.round((value / successValue) * 100)}% Loaded`,
    infinite: false,
    overrides: {},
    showLabel: false,
    size: SIZE.medium,
    steps: 1,
    successValue: 100,
    value: 0,
  };

  componentDidMount() {
    // TODO(v11): remove warning when switching default Spinner
    if (__DEV__) {
      if (this.props.errorMessage) {
        console.warn(
          'baseui:ProgressBar The `errorMessage` prop is deprecated in WAI-ARIA v1.2.',
        );
      }
    }
  }

  render() {
    const {
      ariaLabel,
      overrides = {},
      getProgressLabel,
      value,
      size,
      steps,
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
    const [InfiniteBar, infiniteBarProps] = getOverrides(
      overrides.InfiniteBar,
      StyledInfiniteBar,
    );
    const sharedProps = {
      $infinite: infinite,
      $size: size,
      $steps: steps,
      $successValue: successValue,
      $value: value,
    };
    function renderProgressBar() {
      const children = [];
      for (let i = 0; i < steps; i++) {
        children.push(
          <Bar key={i} {...sharedProps} {...barProps}>
            <BarProgress $index={i} {...sharedProps} {...barProgressProps} />
          </Bar>,
        );
      }
      return children;
    }
    return (
      // eslint-disable-next-line jsx-a11y/role-supports-aria-props
      <Root
        data-baseweb="progress-bar"
        role="progressbar"
        aria-label={ariaLabel || getProgressLabel(value, successValue)}
        aria-valuenow={infinite ? null : value}
        aria-valuemin={infinite ? null : 0}
        aria-valuemax={infinite ? null : successValue}
        aria-invalid={errorMessage ? true : null}
        aria-errormessage={errorMessage}
        {...sharedProps}
        {...rootProps}
      >
        <BarContainer {...sharedProps} {...barContainerProps}>
          {infinite ? (
            <React.Fragment>
              <InfiniteBar
                $isLeft={true}
                $size={sharedProps.$size}
                {...infiniteBarProps}
              />
              <InfiniteBar $size={sharedProps.$size} {...infiniteBarProps} />
            </React.Fragment>
          ) : (
            renderProgressBar()
          )}
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

export default withOverrides<
  React.Config<ProgressBarPropsT, ProgressBarPropsDefaultT>,
  mixed,
>(ProgressBar, 'ProgressBar');
