/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {
  mount,
  analyzeAccessibility,
  waitForTimeout,
} = require('../../../e2e/helpers');

const {
  TABLE_ROOT,
  getCellContentsAtColumnIndex,
  sortColumnAtIndex,
  openFilterAtIndex,
  matchArrayElements,
} = require('./utilities.js');

const COLUMN_COUNT = 5;

describe('data table columns', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'data-table--columns');
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'aria-hidden-focus',
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('sorts boolean column', async () => {
    const index = 0;
    await mount(page, 'data-table--columns');
    await page.waitForSelector('div[data-baseweb="data-table"]');
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['T', 'F', 'T', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['T', 'T', 'F', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['F', 'F', 'T', 'T'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['A', 'A', 'A', 'B'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['B', 'A', 'A', 'A'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts numerical column', async () => {
    const index = 2;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['1', '2', '3', '4'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['4', '3', '2', '1'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts string column', async () => {
    const index = 3;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['one', 'two', 'three', 'four'])).toBe(
      true,
    );

    await sortColumnAtIndex(page, index);
    await waitForTimeout(150);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['four', 'one', 'three', 'two'])).toBe(
      true,
    );

    await sortColumnAtIndex(page, index);
    await waitForTimeout(150);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['two', 'three', 'one', 'four'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts datetime column', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    await sortColumnAtIndex(page, index);
    await waitForTimeout(150);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(
      matchArrayElements(desc, [
        '04-12-2011 11:21 31:00',
        '05-11-2012 10:20 30:00',
        '06-14-2013 13:23 33:00',
        '07-13-2014 12:22 32:00',
      ]),
    ).toBe(true);

    await sortColumnAtIndex(page, index);
    await waitForTimeout(150);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(
      matchArrayElements(asc, [
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
      ]),
    ).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('filters boolean column', async () => {
    const index = 0;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['T', 'F', 'T', 'F'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const checkbox = await popover.$('label[data-baseweb="checkbox"]');
    await checkbox.click();
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['T', 'T'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="presentation"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(restored, ['T', 'F', 'T', 'F'])).toBe(true);
  });

  it('filters categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const checkbox = await popover.$('label[data-baseweb="checkbox"]');
    await checkbox.click();
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['A', 'A', 'A'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="presentation"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(restored, ['A', 'B', 'A', 'A'])).toBe(true);
  });

  it('filters numerical column as single value', async () => {
    const index = 2;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Single Value');
      return button.click();
    });

    await page.keyboard.press('Backspace');
    await page.type('div[data-baseweb="popover"] input', '2');
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['2'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="presentation"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(restored, ['2', '1', '4', '3'])).toBe(true);
  });

  it('filters numerical column between case', async () => {
    const index = 2;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const buttons = await popover.$$('button');
    const betweenButton = buttons[6];
    await betweenButton.click();

    const inputs = await popover.$$('div[data-baseweb="popover"] input');
    await inputs[0].click();
    await page.keyboard.press('Backspace');
    await inputs[0].type('2');

    await inputs[1].click();
    await page.keyboard.press('Backspace');
    await inputs[1].type('3');

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['2', '3'])).toBe(true);
  });

  it('filters numerical column excludes between case', async () => {
    const index = 2;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const buttons = await popover.$$('button');
    const betweenButton = buttons[6];
    await betweenButton.click();

    const inputs = await popover.$$('div[data-baseweb="popover"] input');
    await inputs[0].click();
    await page.keyboard.press('Backspace');
    await inputs[0].type('2');

    await inputs[1].click();
    await page.keyboard.press('Backspace');
    await inputs[1].type('3');

    const exclude = await popover.$('label[data-baseweb="checkbox"]');
    await exclude.click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['1', '4'])).toBe(true);
  });

  it('filters datetime column - datetime range', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    // can't figure out why the test restarts after selecting the time
    // const popover = await openFilterAtIndex(page, 3);

    // const [, datepicker, starttimepicker, endtimepicker] = await page.$$(
    //   'div[data-baseweb="popover"] input',
    // );

    // await datepicker.click({clickCount: 3});
    // await page.keyboard.press('Backspace');
    // await datepicker.type('04122011');
    // await datepicker.type('04122011');

    // await starttimepicker.click();
    // await starttimepicker.type('11:00');
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');

    // await endtimepicker.click();
    // await endtimepicker.type('11:30');
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');

    // await popover.$$eval('button', items => {
    //   const button = items.find(item => item.textContent === 'Apply');
    //   return button.click();
    // });

    // const filtered = await getCellContentsAtColumnIndex(
    //   page,
    //   COLUMN_COUNT,
    //   index,
    // );
    // expect(matchArrayElements(filtered, ['04-12-2011 11:21 31:00'])).toBe(true);
  });

  it('filters datetime column - date range', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [select, datepicker] = await page.$$(
      'div[data-baseweb="popover"] input',
    );

    await select.click();
    const [, dateop] = await page.$$('li');
    await dateop.click();

    await datepicker.click({clickCount: 3});
    await page.keyboard.press('Backspace');
    await datepicker.type('07–13–2014 – 07–13–2014');

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['07-13-2014 12:22 32:00'])).toBe(true);
  });

  it('filters datetime column - date range - default', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [select] = await page.$$('div[data-baseweb="popover"] input');
    await select.click();
    const [, dateop] = await page.$$('li');
    await dateop.click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(filtered, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);
  });

  it('filters datetime column - time range', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [select, , starttimepicker, endtimepicker] = await page.$$(
      'div[data-baseweb="popover"] input',
    );

    await select.click();
    const [, , timeop] = await page.$$('li');
    await timeop.click();

    await starttimepicker.click();
    await starttimepicker.type('13:00');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await endtimepicker.click();
    await endtimepicker.type('13:30');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['06-14-2013 13:23 33:00'])).toBe(true);
  });

  it('filters datetime column - weekday categorical', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);
    const [, categorical] = await popover.$$(
      'div[data-baseweb="button-group"] button',
    );
    await categorical.click();
    const [sunday] = await popover.$$('label[data-baseweb="checkbox"]');
    await sunday.click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['07-13-2014 12:22 32:00'])).toBe(true);
  });

  it('filters datetime column - month categorical', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [, categorical] = await popover.$$(
      'div[data-baseweb="button-group"] button',
    );
    await categorical.click();

    const select = await page.$('div[data-baseweb="popover"] input');
    await select.click();
    const [, month] = await page.$$('li');
    await month.click();

    const months = await popover.$$('label[data-baseweb="checkbox"]');
    await months[4].click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['05-11-2012 10:20 30:00'])).toBe(true);
  });

  it('filters datetime column - quarter categorical', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [, categorical] = await popover.$$(
      'div[data-baseweb="button-group"] button',
    );
    await categorical.click();

    const select = await page.$('div[data-baseweb="popover"] input');
    await select.click();
    const [, , quarter] = await page.$$('li');
    await quarter.click();

    const quarters = await popover.$$('label[data-baseweb="checkbox"]');
    await quarters[2].click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['07-13-2014 12:22 32:00'])).toBe(true);
  });

  it('filters datetime column - half categorical', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [, categorical] = await popover.$$(
      'div[data-baseweb="button-group"] button',
    );
    await categorical.click();

    const select = await page.$('div[data-baseweb="popover"] input');
    await select.click();
    const [, , , half] = await page.$$('li');
    await half.click();

    const halves = await popover.$$('label[data-baseweb="checkbox"]');
    await halves[1].click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['07-13-2014 12:22 32:00'])).toBe(true);
  });

  it('filters datetime column - year categorical', async () => {
    const index = 4;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(
      matchArrayElements(initial, [
        '05-11-2012 10:20 30:00',
        '04-12-2011 11:21 31:00',
        '07-13-2014 12:22 32:00',
        '06-14-2013 13:23 33:00',
      ]),
    ).toBe(true);

    const popover = await openFilterAtIndex(page, 3);

    const [, categorical] = await popover.$$(
      'div[data-baseweb="button-group"] button',
    );
    await categorical.click();

    const select = await page.$('div[data-baseweb="popover"] input');
    await select.click();
    const [, , , , year] = await page.$$('li');
    await year.click();

    const [, twentytwelve] = await popover.$$('label[data-baseweb="checkbox"]');
    await twentytwelve.click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['05-11-2012 10:20 30:00'])).toBe(true);
  });
});
