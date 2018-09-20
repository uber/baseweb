/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as webdriver from 'selenium-webdriver';
import e2e from '../e2e-test-utils';
import {suite, examples} from './examples';

const {run, goToUrl} = e2e;
const {By, until} = webdriver;

run((driver, browser) => {
  describe(suite, function() {
    test('Focus handled correctly', async function() {
      await goToUrl(driver, suite, examples.SIMPLE_EXAMPLE);

      // Close modal to start fresh
      let closeButton = await driver.findElement(
        By.css('button[aria-label="Close"]'),
      );
      closeButton.click();

      // Wait for dialog to close
      await driver.wait(until.stalenessOf(closeButton));

      // Open modal
      let openModalButton = await driver.findElement(
        By.css('.open-modal-button'),
      );
      openModalButton.click();

      // Wait for dialog to open
      await driver.wait(until.elementLocated(By.css('[role="document"]')));

      // Dialog should be focused
      const dialog = await driver.findElement(By.css('[role="document"]'));
      let focused = await driver.switchTo().activeElement();
      expect(await dialog.getId()).toBe(await focused.getId());

      // Close modal again
      closeButton = await driver.findElement(
        By.css('button[aria-label="Close"]'),
      );
      closeButton.click();

      // Wait for dialog to close
      await driver.wait(until.stalenessOf(closeButton));

      // Focus should have transitioned back to button
      openModalButton = await driver.findElement(By.css('.open-modal-button'));
      focused = await driver.switchTo().activeElement();
      expect(await openModalButton.getId()).toBe(await focused.getId());
    });
  });
});
