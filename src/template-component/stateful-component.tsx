/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Component from './component';
import type { StatefulComponentProps } from './types';

function StatefulComponent(props: StatefulComponentProps) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(componentProps) => <Component {...componentProps}>{children}</Component>}
    </StatefulContainer>
  );
}

StatefulComponent.defaultProps = StatefulContainer.defaultProps;

export default StatefulComponent;
