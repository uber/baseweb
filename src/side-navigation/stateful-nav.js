/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import Navigation from './nav.js';
import type {StatefulNavPropsT} from './types.js';

export default function StatefulNavigation(props: StatefulNavPropsT) {
  return (
    <StatefulContainer {...props}>
      {childrenProps => <Navigation {...childrenProps} />}
    </StatefulContainer>
  );
}
