/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {ThemeProvider, LightTheme} from '../../index.js';
<<<<<<< HEAD
import {StatefulPagination} from '../index.js';
=======
import {component as PaginationScenario} from './pagination.scenario.js';
>>>>>>> Release v8.14.0 (#1690)

export const name = 'pagination-rtl';

export const component = () => (
  <ThemeProvider theme={{...LightTheme, direction: 'rtl'}}>
    <div dir="rtl">
<<<<<<< HEAD
      <StatefulPagination
        overrides={{
          NextButton: {props: {'data-test': 'next-button'}},
          PrevButton: {props: {'data-test': 'prev-button'}},
        }}
        numPages={10}
      />
=======
      <PaginationScenario />
>>>>>>> Release v8.14.0 (#1690)
    </div>
  </ThemeProvider>
);
