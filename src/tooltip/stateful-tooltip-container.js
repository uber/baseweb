/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StatefulContainer as StatefulPopoverContainer} from '../popover/index.js';
import baseDefaultProps from './default-props.js';
import type {StatefulTooltipContainerPropsT} from './types.js';

class StatefulContainer extends React.Component<StatefulTooltipContainerPropsT> {
  static defaultProps: $Shape<StatefulTooltipContainerPropsT> = {
    ...baseDefaultProps,
  };

  render() {
    return <StatefulPopoverContainer {...this.props} />;
  }
}

export default StatefulContainer;
