/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {mergeOverrides, getOverrides} from '../helpers/overrides.js';
import Icon from '../icon/icon.js';

import {
  Svg as StyledSvg,
  StyledActivePath,
  StyledTrackPath,
} from './styled-components.js';
import type {SpinnerPropsT} from './types.js';

class Spinner extends React.Component<SpinnerPropsT> {
  static defaultProps: $Shape<SpinnerPropsT> = {
    color: '',
    size: 44,
    title: 'Loading',
    overrides: {},
  };

  componentDidMount() {
    // TODO(v10): remove warning when switching default Spinner
    if (__DEV__) {
      console.warn(
        `❖ [baseui] Please consider using "StyledSpinnerNext" instead of "Spinner". ` +
          `In v10, "StyledSpinnerNext" will become the default "Spinner"` +
          ` and the current SVG based implementation will be deprecated.`,
      );
    }
  }

  render() {
    const {overrides = {}} = this.props;
    const mergedOverrides = mergeOverrides({Svg: StyledSvg}, overrides);
    const [TrackPath, trackPathProps] = getOverrides(
      overrides.TrackPath,
      StyledTrackPath,
    );
    const [ActivePath, activePathProps] = getOverrides(
      overrides.ActivePath,
      StyledActivePath,
    );

    return (
      <Icon
        data-baseweb="spinner"
        title="Spinner"
        viewBox="3 3 18 18"
        {...this.props}
        overrides={mergedOverrides}
      >
        <TrackPath
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          $color={this.props.color}
          {...trackPathProps}
        />
        <ActivePath
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          $color={this.props.color}
          {...activePathProps}
        />
      </Icon>
    );
  }
}

export default Spinner;
