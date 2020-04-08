/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {Children} from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {Root as StyledRoot} from './styled-components.js';
import type {StatelessAccordionPropsT} from './types.js';

function StatelessAccordion({
  children,
  disabled,
  overrides = {},
  renderAll,
  renderPanelContent,
}: StatelessAccordionPropsT) {
  const {Root: RootOverrides, ...PanelOverrides} = overrides;
  const [Root, rootProps] = getOverrides(RootOverrides, StyledRoot);
  return (
    <Root data-baseweb="accordion" {...rootProps}>
      {Children.map(children, child =>
        React.cloneElement(child, {
          disabled: child.props.disabled || disabled,
          overrides: child.props.overrides || PanelOverrides,
          renderAll,
          renderPanelContent,
        }),
      )}
    </Root>
  );
}

export default StatelessAccordion;
