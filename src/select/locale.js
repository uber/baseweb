/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type SelectLocaleT = {|
  noResultsMsg: string,
  placeholder: string,
  create: string,
|};

const locale = {
  noResultsMsg: 'No results found',
  placeholder: 'Select...',
  create: 'Create',
};

export default locale;
