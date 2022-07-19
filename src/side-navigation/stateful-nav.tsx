/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Navigation from './nav';
import type { StatefulNavProps } from './types';

export default function StatefulNavigation(props: StatefulNavProps) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps) => <Navigation {...childrenProps} />}
    </StatefulContainer>
  );
}
