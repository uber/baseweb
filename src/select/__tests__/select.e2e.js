/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  selectInput: 'input[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  dropDownOption: '[role="option"]',
  selectedList: '[data-id="selected"]',
  searchType: '[aria-autocomplete="list"]',
  expandedDropDown: '[aria-expanded="true"]',
};

const optionAtPosition = position =>
  `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(${position})`;

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe('select', () => {
  it(`passes basic a11y tests`, async () => {
    await mount(page, 'select');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('opens dropdown menu when click on select input', async () => {
    await mount(page, 'select');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
  });

  it('opened dropdown can be closed with ESC', async () => {
    await mount(page, 'select');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });
  });

  it('selects option when clicked in dropdown', async () => {
    await mount(page, 'select-search-single');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });

    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });

  it('doesnt allow to click and select disabled options', async () => {
    await mount(page, 'select-search-single');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(2));
    await page.waitFor(selectors.selectDropDown);
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('Start searching');
  });

  it('allows left/right arrow keys to navigate search text', async () => {
    await mount(page, 'select-search-single');
    await page.waitFor(selectors.selectInput);
    await page.focus(selectors.selectInput);
    await page.keyboard.type('Aqua');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.type('z');
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('Aquza');
  });

  it('does not close dropdown after multiple selections were made', async () => {
    await mount(page, 'select-search-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitFor(optionAtPosition(3));
    await page.click(optionAtPosition(3));
    await page.waitFor(selectors.selectDropDown);
  });

  it('selects options when search input successful with results', async () => {
    await mount(page, 'select-search-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.type(selectors.selectInput, 'dark');
    await page.waitFor(selectors.selectDropDown);
    await page.waitFor(optionAtPosition(2));
    await page.click(optionAtPosition(1));
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('DarkBlue');
  });

  it('creates and selects a new option', async () => {
    await mount(page, 'select-creatable');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.keyboard.type('Paris');
    const option1Text = await page.$eval(
      optionAtPosition(1),
      select => select.innerText,
    );
    expect(option1Text).toBe('Create “Paris”');
    await page.click(optionAtPosition(1));
    const inputValue = await page.$eval(
      selectors.selectedList,
      select => select.innerText,
    );
    expect(inputValue).toBe('Paris');
  });

  it('shows the no result msg if there are no options', async () => {
    await mount(page, 'select-creatable-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(1));

    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    const dropdown = await page.$(selectors.selectDropDown);
    const text = await page.evaluate(
      dropdown => dropdown.textContent,
      dropdown,
    );
    expect(text).toBe('No results');
  });

  it('creates multiple options', async () => {
    await mount(page, 'select-creatable-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);

    // add "Paris"
    await page.keyboard.type('Paris');
    await page.$eval(optionAtPosition(1), elem => elem.click());
    const inputValue = await page.$eval(
      selectors.selectedList,
      select => select.innerText,
    );
    expect(inputValue).toBe('Paris');

    // add "London"
    await page.keyboard.type('London');
    await page.click(optionAtPosition(1));
    const inputValue2 = await page.$eval(
      selectors.selectedList,
      select => select.innerText,
    );
    expect(inputValue2).toBe('Paris\nLondon');

    // add "Paris" again, option to create should not be provided
    await page.keyboard.type('Paris');
    const canBeParisCreated = (await page.$(optionAtPosition(1))) !== null;
    expect(canBeParisCreated).toBeFalsy();
  });

  it('selects second option without mouse or arrow keys', async () => {
    await mount(page, 'select-search-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.type(selectors.selectInput, 'dark');
    await page.keyboard.press('Enter');
    await page.type(selectors.selectInput, 'az');
    await page.keyboard.press('Enter');
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('DarkBlueAzure');
  });

  it('renders expected grouped list items', async () => {
    await mount(page, 'select-option-group');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    const listElements = await page.$$('li');
    const actual = await Promise.all(
      listElements.map(listElement => {
        return page.evaluate(li => li.textContent, listElement);
      }),
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

  it('renders expected grouped list items if filtered', async () => {
    await mount(page, 'select-option-group');
    await page.waitFor(selectors.selectInput);
    await page.focus(selectors.selectInput);
    await page.keyboard.type('Aqua');
    const listElements = await page.$$('li');
    const actual = await Promise.all(
      listElements.map(listElement => {
        return page.evaluate(li => li.textContent, listElement);
      }),
    );
    const expected = ['Blueish', 'Aqua', 'Aquamarine'];

    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('skips optgroup headers when navigating with keyboard controls', async () => {
    await mount(page, 'select-option-group');
    await page.focus(selectors.selectInput);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });

  it('works with async options', async () => {
    await mount(page, 'select-async-options');
    await page.focus(selectors.selectInput);
    await page.keyboard.type('Aqua');
    const listElements = await page.$$('li');
    const actual = await Promise.all(
      listElements.map(listElement => {
        return page.evaluate(li => li.textContent, listElement);
      }),
    );
    const expected = ['Aqua', 'Aquamarine'];

    expect(matchArrayElements(actual, expected)).toBe(true);
  });
});
