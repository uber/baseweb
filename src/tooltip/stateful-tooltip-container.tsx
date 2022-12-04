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
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    return <StatefulPopoverContainer {...this.props} />;
  }
}

export default StatefulContainer;
