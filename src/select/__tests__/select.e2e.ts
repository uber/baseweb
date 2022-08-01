/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  selectInput: 'input[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  dropDownOption: '[role="option"]',
  selectedList: '[data-id="selected"]',
  searchType: '[aria-autocomplete="list"]',
  expandedDropDown: '[aria-expanded="true"]',
  clearIcon: '[data-id="clear-icon"]',
};

const optionAtPosition = (position) =>
  `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(${position})`;

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

test.describe('select', () => {
  test(`passes basic a11y tests`, async ({ page }) => {
    await mount(page, 'select--select');
    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('opens dropdown menu when click on select input', async ({ page }) => {
    await mount(page, 'select--select');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
  });

  test('opened dropdown can be closed with ESC', async ({ page }) => {
    await mount(page, 'select--select');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectDropDown, {
      state: 'hidden',
    });
  });

  test('selects option when clicked in dropdown', async ({ page }) => {
    await mount(page, 'select--search-single');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitForSelector(selectors.selectDropDown, {
      state: 'hidden',
    });

    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('AliceBlue');
  });

  test('doesnt allow to click and select disabled options', async ({ page }) => {
    await mount(page, 'select--search-single');

    const input = page.locator(selectors.selectInput);
    const selected = page.locator(selectors.selectedList);
    const listItems = page.locator(selectors.selectDropDown).locator('li');

    await input.click();
    await expect(listItems.nth(1)).toBeDisabled();
    await listItems.nth(1).click({ force: true });
    await expect(selected).toContainText('Start searching', { useInnerText: true });
  });

  test('allows left/right arrow keys to navigate search text', async ({ page }) => {
    await mount(page, 'select--search-single');
    await page.waitForSelector(selectors.selectInput);
    await page.focus(selectors.selectInput);
    await page.keyboard.type('Aqua');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.type('z');
    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('Aquza');
  });

  test('renders clear button after input text is typed in', async ({ page }) => {
    await mount(page, 'select--search-single');
    await page.waitForSelector(selectors.selectInput);
    await page.focus(selectors.selectInput);

    await page.keyboard.type('a');
    const first = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(first).toBe('a');

    await page.click(selectors.clearIcon);
    const second = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(second).toBe('Start searching');
  });

  test('does not close dropdown after multiple selections were made', async ({ page }) => {
    await mount(page, 'select--search-multi');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitForSelector(optionAtPosition(3));
    await page.click(optionAtPosition(3));
    await page.waitForSelector(selectors.selectDropDown);
  });

  test('selects options when search input successful with results', async ({ page }) => {
    await mount(page, 'select--search-multi');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.type(selectors.selectInput, 'dark');
    await page.waitForSelector(selectors.selectDropDown);
    await page.waitForSelector(optionAtPosition(2));
    await page.click(optionAtPosition(1));
    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('DarkBlueDelete');
  });

  test('subsequent multi select dropdown opens highlights first value', async ({ page }) => {
    await mount(page, 'select--search-multi');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.keyboard.press('Enter');

    const first = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(first).toBe('AliceBlueDelete');

    await page.keyboard.press('Enter');
    const second = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(second).toBe('AliceBlueDeleteAntiqueWhiteDelete');
  });

  test('subsequent multi select dropdown opens highlights first value after keyboard navigation', async ({
    page,
  }) => {
    await mount(page, 'select--search-multi');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.type(selectors.selectInput, 'be');
    await page.keyboard.press('Enter');
    const text = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(text).toBe('AzureDeleteBeigeDelete');
  });

  test('creates and selects a new option', async ({ page }) => {
    await mount(page, 'select--creatable');

    const input = page.locator(selectors.selectInput);
    const selected = page.locator(selectors.selectedList);
    const listItems = page.locator(selectors.selectDropDown).locator('li');

    await input.click();
    await input.type('Paris');
    await expect(listItems.first()).toContainText('Paris');
    await listItems.first().click();
    await expect(selected).toContainText('Paris', { useInnerText: true });
  });

  test('shows the no result msg if there are no options', async ({ page }) => {
    await mount(page, 'select--creatable-multi');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.click(optionAtPosition(1));

    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    const dropdown = await page.$(selectors.selectDropDown);
    const text = await page.evaluate((dropdown) => dropdown.textContent, dropdown);
    expect(text).toBe('No results');
  });

  test('creates multiple options', async ({ page }) => {
    await mount(page, 'select--creatable-multi');
    const input = page.locator(selectors.selectInput);
    const selected = page.locator(selectors.selectedList);
    const listItems = page.locator(selectors.selectDropDown).locator('li');

    await input.click();

    await input.fill('Paris');
    await listItems.first().click();
    await expect(page.locator('text=Paris')).toBeVisible();

    await input.fill('London');
    await listItems.first().click();
    await expect(page.locator('text=London')).toBeVisible();

    await input.fill('Paris');
    await expect(listItems.first()).toHaveText('No results');
  });

  test('selects second option without mouse or arrow keys', async ({ page }) => {
    await mount(page, 'select--search-multi');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.type(selectors.selectInput, 'dark');
    await page.keyboard.press('Enter');
    await page.type(selectors.selectInput, 'az');
    await page.keyboard.press('Enter');
    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('DarkBlueDeleteAzureDelete');
  });

  test('renders expected grouped list items', async ({ page }) => {
    await mount(page, 'select--option-group');
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    const listElements = await page.$$('li');
    const actual = await Promise.all(
      listElements.map((listElement) => {
        return page.evaluate((li) => li.textContent, listElement);
      })
    );
    const expected = [
      'Black',
      'Blueish',
      'AliceBlue',
      'Aqua',
      'Aquamarine',
      'Whiteish',
      'AntiqueWhite',
      'Azure',
      'Beige',
    ];

    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('renders expected grouped list items if filtered', async ({ page }) => {
    await mount(page, 'select--option-group');
    await page.waitForSelector(selectors.selectInput);
    await page.focus(selectors.selectInput);
    await page.keyboard.type('Aqua');
    const listElements = await page.$$('li');
    const actual = await Promise.all(
      listElements.map((listElement) => {
        return page.evaluate((li) => li.textContent, listElement);
      })
    );
    const expected = ['Blueish', 'Aqua', 'Aquamarine'];

    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('skips optgroup headers when navigating with keyboard controls', async ({ page }) => {
    await mount(page, 'select--option-group');
    await page.focus(selectors.selectInput);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectors.selectDropDown, {
      state: 'hidden',
    });
    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('AliceBlue');
  });

  test('works with async options', async ({ page }) => {
    await mount(page, 'select--async-options');
    const input = page.locator(selectors.selectInput);
    await input.fill('Aqua');
    const dropdown = page.locator(selectors.selectDropDown);
    const listElements = dropdown.locator('li');
    await expect(listElements).toHaveCount(2);
    await expect(listElements.nth(0)).toHaveText('Aqua');
    await expect(listElements.nth(1)).toHaveText('Aquamarine');
  });
});
