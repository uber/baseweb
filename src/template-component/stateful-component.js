/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import Component from './component.js';
import type {StatefulComponentPropsT} from './types.js';

function StatefulComponent(props: StatefulComponentPropsT) {
  const {children, ...restProps} = props;
  return (
    <StatefulContainer {...restProps}>
      {componentProps => <Component {...componentProps}>{children}</Component>}
    </StatefulContainer>
  );
}

StatefulComponent.defaultProps = StatefulContainer.defaultProps;

export default StatefulComponent;
