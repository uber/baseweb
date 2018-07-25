// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Popover from './popover';
import type {StatefulPopoverPropsT} from './types';

function StatefulPopover(props: StatefulPopoverPropsT) {
  const {children, ...restProps} = props;
  return (
    <StatefulContainer {...restProps}>
      {popoverProps => <Popover {...popoverProps}>{children}</Popover>}
    </StatefulContainer>
  );
}

StatefulPopover.defaultProps = StatefulContainer.defaultProps;

export default StatefulPopover;
