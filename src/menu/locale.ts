/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export type MenuLocale = {
  noResultsMsg: string;
  parentMenuItemAriaLabel: string;
  noResultsStatus: string;
  itemsAvailableStatus: (count: number) => string;
};

const locale: MenuLocale = {
  noResultsMsg: 'No results',
  noResultsStatus: 'No options available',
  itemsAvailableStatus: (count: number) =>
    `${count} ${count === 1 ? 'option' : 'options'} available`,
  parentMenuItemAriaLabel: `You are currently at an item that opens a nested listbox. Press right arrow to enter that element and left arrow to return.`,
};

export default locale;
