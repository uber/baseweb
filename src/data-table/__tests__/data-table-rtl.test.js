/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {columns, rows} from './data-table.scenario.js';
import {Unstable_DataTable} from '../index.js';
import {ThemeProvider, LightTheme} from '../../index.js';

describe('rendering data-table in RTL direction', () => {
  it('should match snapshot', () => {
    expect(
      mount(
        <ThemeProvider theme={{...LightTheme, direction: 'rtl'}}>
          <div dir="rtl">
            <div style={{height: '800px', width: '900px'}}>
              <Unstable_DataTable columns={columns} rows={rows} />
            </div>
          </div>
        </ThemeProvider>,
      ),
    ).toMatchSnapshot();
  });
});
