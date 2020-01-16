/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global document */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  phoneInput: `[data-baseweb="phone-input"]`,
  phoneInputInput: `[data-baseweb="phone-input"] > input`,
  phoneInputFlag: `[data-e2e="country-flag"]`,
  phoneInputDialcode: `[data-e2e="phone-input-dialcode"]`,
  phoneInputSelect: `[data-baseweb="select"]`,
  phoneInputSelectDropdown: `[role="listbox"]`,
  phoneInputSelectListItem: `[data-e2e="country-select-list-item"]`,
};

const countryListItemForIso = iso =>
  `${selectors.phoneInputSelectListItem} [data-iso="${iso}"]`;

const unitedStates = {iso: 'US', dialCode: '+1'};
const unitedKingdom = {iso: 'GB', dialCode: '+44'};

describe('PhoneInput', () => {
  beforeEach(async () => {
    await mount(page, 'phone-input');
    await page.waitFor(selectors.phoneInput);
  });

  it('passes basic a11y tests', async () => {
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('displays a selected country flag and dial code by default', async () => {
    // verify correct default flag shows up
    const iso = await page.$eval(selectors.phoneInputFlag, flag =>
      flag.getAttribute(`data-iso`),
    );
    expect(iso).toEqual(unitedStates.iso);
    // verify correct default dialcode shows up
    const dialcode = await page.$eval(
      selectors.phoneInputDialcode,
      block => block.innerText,
    );
    expect(dialcode).toEqual(unitedStates.dialCode);
  });

  it('allows a user to open a dropdown containing country dial codes', async () => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitFor(selectors.phoneInputSelectDropdown);
    // // verify US option is visible
    await page.waitForSelector(countryListItemForIso(unitedStates.iso), {
      visible: true,
    });
  });

  it('allows a user select a country using the keyboard', async () => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitFor(selectors.phoneInputSelectDropdown);

    await page.keyboard.type('United');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const dialcode = await page.$eval(
      selectors.phoneInputDialcode,
      block => block.innerText,
    );
    expect(dialcode).toEqual(unitedKingdom.dialCode);
  });

  it('allows a user to select a country from the dropdown, \
  which populates a dial code', async () => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitFor(selectors.phoneInputSelectDropdown);
    // select a new country, United Kingdom
    await page.click(countryListItemForIso(unitedKingdom.iso));
    // verify dropdown has closed
    await page.waitForSelector(selectors.phoneInputSelectDropdown, {
      hidden: true,
    });
    // verify correct flag and dial code shows up
    const iso = await page.$eval(selectors.phoneInputFlag, flag =>
      flag.getAttribute('data-iso'),
    );
    expect(iso).toEqual(unitedKingdom.iso);
    // verify correct dial code shows up
    const dialcode = await page.$eval(
      selectors.phoneInputDialcode,
      block => block.innerText,
    );
    expect(dialcode).toEqual(unitedKingdom.dialCode);
    // verify input has focus
    const inputIsFocused = await page.$eval(
      selectors.phoneInputInput,
      input => input === document.activeElement,
    );
    expect(inputIsFocused).toBe(true);
  });
});
