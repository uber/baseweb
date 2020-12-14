/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import Textarea from './textarea.js';
import type {StatefulTextareaPropsT, TextareaPropsT} from './types.js';

export default function StatefulTextarea(props: StatefulTextareaPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: TextareaPropsT) => <Textarea {...childrenProps} />}
    </StatefulContainer>
  );
}
