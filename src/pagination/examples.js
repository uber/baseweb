/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulPagination from './stateful-pagination.js';
import Pagination from './pagination.js';
import {KIND} from '../button/index.js';

export const suite = 'Pagination Test Suite';
import examples from './examples-list.js';

export default {
  [examples.STATEFUL_PAGINATION]: function Story1() {
    return (
      <StatefulPagination
        overrides={{
          NextButton: {props: {'data-test': 'next-button'}},
          PrevButton: {props: {'data-test': 'prev-button'}},
          DropdownButton: {props: {'data-test': 'dropdown-button'}},
        }}
        numPages={10}
      />
    );
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
