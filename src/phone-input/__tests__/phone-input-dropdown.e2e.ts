/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  phoneInput: `[data-baseweb="phone-input"]`,
  phoneInputDialcode: `[data-e2e="phone-input-dialcode"]`,
  countryPicker: `[data-baseweb="select"]`,
  countryPickerFlag: `[data-e2e="country-flag"]`,
  countryPickerDropdown: `[role="listbox"]`,
  countryPickerListItem: `[data-e2e="country-picker-list-item"]`,
};

const countryListItemForIso = (iso) => `${selectors.countryPickerListItem} [data-iso="${iso}"]`;

const UK = { iso: 'GB', dialCode: '+44' };

test.describe('PhoneInput', () => {
  test.beforeEach(async ({ page }) => {
    await mount(page, 'phone-input--dropdown');
    await page.waitForSelector(selectors.phoneInput);
  });

  test('passes basic a11y tests', async ({ page }) => {
    const accessibilityReport = await analyzeAccessibility(page, [
      { id: 'autocomplete-valid', enabled: false },
    ]);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('check that a user can select a country from the dropdown \
  which populates a dial code in the input', async ({
    page,
  }) => {
    // click select
    await page.click(selectors.countryPicker);
    // verify dropdown is open
    await page.waitForSelector(selectors.countryPickerDropdown);
    // select a new country - UK
    await page.waitForSelector(countryListItemForIso(UK.iso));
    await page.click(countryListItemForIso(UK.iso));
    // verify dropdown has closed
    await page.waitForSelector(selectors.countryPickerDropdown, {
      state: 'hidden',
    });
    // verify correct flag and dial code shows up
    const iso = await page.$eval(selectors.countryPickerFlag, (flag) =>
      flag.getAttribute('data-iso')
    );
    expect(iso).toEqual(UK.iso);
    // verify correct dial code shows up
    const dialcode = await page.$eval(selectors.phoneInputDialcode, (block) => block.innerText);
    expect(dialcode).toEqual(UK.dialCode);
  });
});
