/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Tag, KIND} from '../index.js';

export const name = 'tag';

export const component = () => (
  <React.Fragment>
    <Tag key="default">Default Color</Tag>
    {Object.keys(KIND).map(kind => (
      <Tag
        key={kind}
        // eslint-disable-next-line flowtype/no-weak-types
        kind={(kind: any)}
        {...(kind === 'custom' ? {color: '#748ecc'} : {})}
      >
        kind {kind}
      </Tag>
    ))}
  </React.Fragment>
);
