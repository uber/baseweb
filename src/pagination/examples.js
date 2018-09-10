/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulPagination from './stateful-pagination';

export const suite = 'Pagination Test Suite';
export const examples = {
  STATEFUL_PAGINATION: 'Stateful Pagination',
};

export default {
  [examples.STATEFUL_PAGINATION]: function Story1() {
    return <StatefulPagination numPages={10} />;
  },
};
