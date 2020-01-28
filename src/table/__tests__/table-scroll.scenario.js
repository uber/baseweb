/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Table} from '../index.js';

export const name = 'table-scroll';

export const component = () => (
  <div style={{height: '500px', maxWidth: '1200px'}}>
    <Table
      columns={[...new Array(10)].map(() => 'Column Name')}
      data={[...new Array(40)].map(() =>
        [...new Array(10)].map(() => 'Cell Data'),
      )}
      horizontalScrollWidth="2200px"
    />
  </div>
);
