/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mergeOverrides} from '../helpers/overrides.js';
import {Spinner as SpinnerIcon} from '../icon/index.js';
import {Svg as StyledSvg} from './styled-components.js';

import type {SpinnerPropsT} from './types.js';

class Spinner extends React.Component<SpinnerPropsT> {
  static defaultProps: $Shape<SpinnerPropsT> = {
    color: '',
    size: 44,
    title: 'Loading',
    overrides: {},
  };

  render() {
    const overrides = mergeOverrides({Svg: StyledSvg}, this.props.overrides);
    return (
      <SpinnerIcon
        role="progressbar"
        viewBox="3 3 18 18"
        {...this.props}
        overrides={overrides}
      />
    );
  }
}

export default Spinner;
