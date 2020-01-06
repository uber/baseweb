/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Table} from '../index.js';

export const name = 'table-few-rows';

export const component = () => (
  <div style={{height: '400px', width: '800px'}}>
    <Table
      columns={[...new Array(3)].map(() => 'Column Name')}
      data={[...new Array(4)].map(() =>
        [...new Array(3)].map(() => 'Cell Data'),
      )}
    />
  </div>
);
