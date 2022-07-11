/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import { Popover } from '../popover/index';
import { mergeOverrides } from '../helpers/overrides';
import baseDefaultProps from './default-props';
import type { TooltipPropsT } from './types';
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
} from './styled-components';

class Tooltip extends React.Component<TooltipPropsT> {
  static defaultProps: Partial<TooltipPropsT> = {
    ...baseDefaultProps,
  };

  render() {
    const overrides = mergeOverrides(
      {
        Arrow: StyledArrow,
        Body: StyledBody,
        Inner: StyledInner,
      },
      this.props.overrides
    );
    return (
      <Popover autoFocus={false} data-baseweb="tooltip" {...this.props} overrides={overrides} />
    );
  }
}

export default Tooltip;
