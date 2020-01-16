/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type DataTableLocaleT = {|
  emptyState: string,
|};

const locale = {
  emptyState:
    'No rows match the filter criteria defined. Please remove one or more filters to view more data.',
};

export default locale;
