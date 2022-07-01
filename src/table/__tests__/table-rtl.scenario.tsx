/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Table } from '../index';
import { ThemeProvider, LightTheme } from '../../index';

export function Scenario() {
  return (
    <ThemeProvider theme={{ ...LightTheme, direction: 'rtl' }}>
      <div dir="rtl" style={{ height: '400px', width: '800px' }}>
        <Table
          columns={[...new Array(3)].map(() => 'Column Name')}
          data={[...new Array(4)].map(() => [...new Array(3)].map(() => 'Cell Data'))}
        />
      </div>
    </ThemeProvider>
  );
}
