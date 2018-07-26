// @flow
import * as React from 'react';
import StatefulContainer from './stateful-tooltip-container';
import Tooltip from './tooltip';
import type {StatefulTooltipPropsT} from './types';

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
