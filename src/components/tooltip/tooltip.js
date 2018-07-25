// @flow
/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import {Popover} from '../popover/index';
import {mergeOverrides} from '../../helpers/overrides';
import baseDefaultProps from './default-props';
import type {TooltipPropsT} from './types';
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
} from './styled-components';

class Tooltip extends React.Component<TooltipPropsT> {
  static defaultProps: $Shape<TooltipPropsT> = {
    ...baseDefaultProps,
  };

  render() {
    const overrides = mergeOverrides(
      {
        Arrow: StyledArrow,
        Body: StyledBody,
        Inner: StyledInner,
      },
      this.props.overrides,
    );
    return <Popover {...this.props} overrides={overrides} />;
  }
}

export default Tooltip;
