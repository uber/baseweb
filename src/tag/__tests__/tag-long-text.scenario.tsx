/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Upload } from '../../icon/index';
import { Tag } from '../index';

export function Scenario() {
  return (
    <div>
      <Tag>Default Color with long text</Tag>
      <br />
      <Tag startEnhancer={() => <Upload />}>Default Color with long text</Tag>
    </div>
  );
}
