// @flow
import * as React from 'react';
import {StatefulContainer as StatefulPopoverContainer} from '../popover/index';
import baseDefaultProps from './default-props';
import type {StatefulTooltipContainerPropsT} from './types';

class StatefulContainer extends React.Component<
  StatefulTooltipContainerPropsT,
> {
  static defaultProps: $Shape<StatefulTooltipContainerPropsT> = {
    ...baseDefaultProps,
  };

  render() {
    return <StatefulPopoverContainer {...this.props} />;
  }
}

export default StatefulContainer;
