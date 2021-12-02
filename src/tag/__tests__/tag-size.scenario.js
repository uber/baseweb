/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Tag, SIZE} from '../index.js';

export function Scenario() {
  return (
    <React.Fragment>
      <Tag size={SIZE.small} closeable={false}>
        Label
      </Tag>
      <Tag size={SIZE.small}>Label</Tag>
      <br />
      <Tag size={SIZE.medium} closeable={false}>
        Label
      </Tag>
      <Tag size={SIZE.medium}>Label</Tag>
      <br />
      <Tag size={SIZE.large} closeable={false}>
        Label
      </Tag>
      <Tag size={SIZE.large}>Label</Tag>
    </React.Fragment>
  );
}
