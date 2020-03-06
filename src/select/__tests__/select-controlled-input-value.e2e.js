/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const SELECT_INPUT = 'div[data-baseweb="select"] input';
const HELLO_WORLD_BUTTON = '#hello-world';
const CLEAR_BUTTON = '#clear';

describe('select controlled input value', () => {
  it('input value state can be maintained by parent', async () => {
    await mount(page, 'select-controlled-input-value');
    await page.waitFor(SELECT_INPUT);

    const input = await page.$(SELECT_INPUT);
    await input.click();

    const expected = 'Aqua';
    await page.keyboard.type(expected);

    const actual = await page.$eval(SELECT_INPUT, input => input.value);
    expect(actual).toBe(expected);
  });

  it('updates input value on state change', async () => {
    await mount(page, 'select-controlled-input-value');
    await page.waitFor(SELECT_INPUT);

    const input = await page.$(SELECT_INPUT);
    await input.click();

    const initial = await page.$eval(SELECT_INPUT, input => input.value);
    expect(initial).toBe('');

    await page.click(HELLO_WORLD_BUTTON);
    const afterHelloWorld = await page.$eval(
      SELECT_INPUT,
      input => input.value,
    );
    expect(afterHelloWorld).toBe('hello world');

    await page.click(CLEAR_BUTTON);
    const afterClear = await page.$eval(SELECT_INPUT, input => input.value);
    expect(afterClear).toBe('');
  });
});
