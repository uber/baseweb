/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global document */

const {mount} = require('../../../e2e/helpers');

const selectors = {
  phoneInput: `[data-baseweb="phone-input"]`,
  phoneInputInput: `[data-baseweb="phone-input"] > input`,
  phoneInputFlag: `[data-e2e="country-flag"]`,
  phoneInputDialcode: `[data-e2e="phone-input-dialcode"]`,
  phoneInputSelect: `[data-baseweb="select"]`,
  phoneInputSelectDropdown: `[role="listbox"]`,
  phoneInputSelectListItem: `[data-e2e="country-select-list-item"]`,
  phoneInputFilterInput: `[data-baseweb="base-input"] input`,
};

const countryListItemForIso = iso =>
  `${selectors.phoneInputSelectListItem}[data-iso="${iso}"]`;

const china = {iso: 'CN', dialCode: '+86'};

describe('PhoneInputFilter', () => {
  beforeEach(async () => {
    await mount(page, 'phone-input-dropdown-filter');
    await page.waitFor(selectors.phoneInput);
  });

  it('allows a user to filter countries', async () => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitFor(selectors.phoneInputSelectDropdown);
    // filter countries
    await page.focus(selectors.phoneInputFilterInput);
    await page.keyboard.type('China');
    // should see China in the menu
    await page.waitForSelector(countryListItemForIso(china.iso));
    // should see only one country
    await page.waitFor(
      selectors => {
        const listItems = document.querySelectorAll(
          selectors.phoneInputSelectListItem,
        );
        return listItems.length === 1;
      },
      {},
      selectors,
    );
    // type additional symbol
    await page.focus(selectors.phoneInputFilterInput);
    await page.keyboard.type('q');
    // should show `No Results` message and list of options should be empty
    await page.waitFor(
      selectors => {
        const listItems = document.querySelectorAll(
          selectors.phoneInputSelectListItem,
        );
        const empty = document.querySelector(
          selectors.phoneInputSelectDropdown + ' li',
        );
        return (
          listItems.length === 0 && empty && empty.textContent == 'No results'
        );
      },
      {},
      selectors,
    );
    // remove additional symbol
    await page.focus(selectors.phoneInputFilterInput);
    await page.keyboard.press('Backspace');
    // select a new country, China
    await page.waitForSelector(countryListItemForIso(china.iso));
    await page.click(countryListItemForIso(china.iso));
    // verify dropdown has closed
    await page.waitForSelector(selectors.phoneInputSelectDropdown, {
      hidden: true,
    });
    // verify correct flag and dial code shows up
    const iso = await page.$eval(selectors.phoneInputFlag, flag =>
      flag.getAttribute('data-iso'),
    );
    expect(iso).toEqual(china.iso);
    // verify correct dial code shows up
    const dialcode = await page.$eval(
      selectors.phoneInputDialcode,
      block => block.innerText,
    );
    expect(dialcode).toEqual(china.dialCode);
    // verify input has focus
    const inputIsFocused = await page.$eval(
      selectors.phoneInputInput,
      input => input === document.activeElement,
    );
    expect(inputIsFocused).toBe(true);
  });
});
