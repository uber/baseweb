/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-tooltip-container.js';
import Tooltip from './tooltip.js';
import type {StatefulTooltipPropsT} from './types.js';

function StatefulTooltip(props: StatefulTooltipPropsT) {
  const {children, ...restProps} = props;
  return (
    <StatefulContainer {...restProps}>
      {tooltipProps => <Tooltip {...tooltipProps}>{children}</Tooltip>}
    </StatefulContainer>
  );
}

StatefulTooltip.defaultProps = StatefulContainer.defaultProps;

export default StatefulTooltip;
