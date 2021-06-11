/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Table} from '../index.js';

export default function Scenario() {
  return (
    <div style={{height: '500px', maxWidth: '1200px'}}>
      <Table
        columns={[...new Array(10)].map(() => 'Column Name')}
        data={[...new Array(40)].map(() =>
          [...new Array(10)].map((val, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div key={index} tabIndex="0">
              Cell Data
            </div>
          )),
        )}
        horizontalScrollWidth="2200px"
      />
    </div>
  );
}
