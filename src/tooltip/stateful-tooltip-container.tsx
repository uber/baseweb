/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { StatefulContainer as StatefulPopoverContainer } from '../popover';
import baseDefaultProps from './default-props';
import type { StatefulTooltipContainerProps } from './types';

class StatefulContainer extends React.Component<StatefulTooltipContainerProps> {
  static defaultProps: Partial<StatefulTooltipContainerProps> = {
    ...baseDefaultProps,
  };

  render() {
    return <StatefulPopoverContainer {...this.props} />;
  }
}

export default StatefulContainer;
