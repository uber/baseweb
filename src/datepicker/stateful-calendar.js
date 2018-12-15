/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import Component from './calendar.js';
import type {StatefulDatepickerPropsT} from './types.js';

function StatefulComponent(props: StatefulDatepickerPropsT) {
  return (
    <StatefulContainer {...props}>
      {componentProps => <Component {...componentProps} />}
    </StatefulContainer>
  );
}

StatefulComponent.defaultProps = StatefulContainer.defaultProps;

export default StatefulComponent;
