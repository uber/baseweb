/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulPagination from './stateful-pagination';
import Pagination from './pagination';
import {KIND} from '../button';

export const suite = 'Pagination Test Suite';
import examples from './examples-list';

export default {
  [examples.STATEFUL_PAGINATION]: function Story1() {
    return <StatefulPagination numPages={10} />;
  },
  [examples.STATELESS_PAGINATION]: function Story2() {
    return <Pagination numPages={18} currentPage={4} />;
  },
  [examples.PAGINATION_OVERRIDE]: function Story2() {
    return (
      <StatefulPagination
        numPages={10}
        labels={{
          prevButton: 'Back',
          nextButton: 'Forward',
          preposition: 'out of',
        }}
        overrides={{
          NextButton: {
            props: {
              kind: KIND.secondary,
            },
          },
          PrevButton: {
            props: {
              kind: KIND.secondary,
            },
          },
          DropdownMenu: {
            style: {
              top: '100px',
            },
          },
        }}
      />
    );
  },
};
