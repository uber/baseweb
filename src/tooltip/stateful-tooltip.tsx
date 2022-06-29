/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-tooltip-container';
import Tooltip from './tooltip';
import type { StatefulTooltipProps } from './types';

function StatefulTooltip(props: StatefulTooltipProps) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(tooltipProps) => <Tooltip {...tooltipProps}>{children}</Tooltip>}
    </StatefulContainer>
  );
}

StatefulTooltip.defaultProps = StatefulContainer.defaultProps;

export default StatefulTooltip;
