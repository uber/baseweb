/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type SelectLocaleT = {|
  // Remove noResultsMsg prop in the next major version
  noResultsMsg: string,
  placeholder: string,
  create: string,
|};

const locale = {
  // Remove noResultsMsg prop in the next major version
  noResultsMsg: 'No results found',
  placeholder: 'Select...',
  create: 'Create',
};

export default locale;
