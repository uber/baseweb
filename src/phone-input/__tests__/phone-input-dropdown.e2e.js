/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  phoneInput: `[data-baseweb="phone-input"]`,
  phoneInputDialcode: `[data-e2e="phone-input-dialcode"]`,
  countryPicker: `[data-baseweb="select"]`,
  countryPickerFlag: `[data-e2e="country-flag"]`,
  countryPickerDropdown: `[role="listbox"]`,
  countryPickerListItem: `[data-e2e="country-picker-list-item"]`,
};

const countryListItemForIso = (iso) =>
  `${selectors.countryPickerListItem} [data-iso="${iso}"]`;

const UK = {iso: 'GB', dialCode: '+44'};

describe('PhoneInput', () => {
  beforeEach(async () => {
    await mount(page, 'phone-input--dropdown');
    await page.waitForSelector(selectors.phoneInput);
  });

  it('passes basic a11y tests', async () => {
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'autocomplete-valid',
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('check that a user can select a country from the dropdown \
  which populates a dial code in the input', async () => {
    // click select
    await page.click(selectors.countryPicker);
    // verify dropdown is open
    await page.waitForSelector(selectors.countryPickerDropdown);
    // select a new country - UK
    await page.waitForSelector(countryListItemForIso(UK.iso));
    await page.click(countryListItemForIso(UK.iso));
    // verify dropdown has closed
    await page.waitForSelector(selectors.countryPickerDropdown, {
      hidden: true,
    });
    // verify correct flag and dial code shows up
    const iso = await page.$eval(selectors.countryPickerFlag, (flag) =>
      flag.getAttribute('data-iso'),
    );
    expect(iso).toEqual(UK.iso);
    // verify correct dial code shows up
    const dialcode = await page.$eval(
      selectors.phoneInputDialcode,
      (block) => block.innerText,
    );
    expect(dialcode).toEqual(UK.dialCode);
  });
});
