/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StyledPanel } from './styled-components';
import { getOverrides } from '../helpers/overrides';
import type { PanelProps } from './types';

export const Panel = React.forwardRef(({ isActive, overrides = {}, children }: PanelProps, ref) => {
  const [Panel, PanelProps] = getOverrides(overrides.Panel, StyledPanel);
  return (
    <Panel
      ref={ref}
      tabIndex={isActive ? '0' : '-1'}
      role="tabpanel"
      hidden={!isActive}
      {...PanelProps}
    >
      {children}
    </Panel>
  );
});
Panel.displayName = 'Panel';
