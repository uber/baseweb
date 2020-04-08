/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {
  Root,
  PanelContainer,
  Header,
  ToggleIcon,
  Content,
} from './styled-components.js';
import PlusIcon from '../icon/plus.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';

function StatelessPanel({expanded, title, children}) {
  return (
    <PanelContainer>
      <Header $expanded={expanded}>
        {title}
        {expanded ? (
          <CheckIndeterminateIcon overrides={{Svg: ToggleIcon}} />
        ) : (
          <PlusIcon overrides={{Svg: ToggleIcon}} />
        )}
      </Header>
      <Content $expanded={expanded}>{children}</Content>
    </PanelContainer>
  );
}

function StatelessAccordion({children}) {
  return <Root>{children}</Root>;
}

export {StatelessAccordion, StatelessPanel};
