/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export type MenuLocaleT = {
  noResultsMsg: string;
  parentMenuItemAriaLabel: string;
};

const locale: MenuLocaleT = {
  noResultsMsg: 'No results',
  parentMenuItemAriaLabel: `You are currently at an item that opens a nested listbox. Press right arrow to enter that element and left arrow to return.`,
};

export default locale;
