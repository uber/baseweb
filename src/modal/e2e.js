/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import e2e from '../utils/e2e-test-utils';

const {run, By, goToUrl} = e2e;
import {suite, examples} from './examples';

run((driver, browser) => {
  describe(suite, function() {
    test('Focus handled correctly', async function() {
      await goToUrl(driver, suite, examples.SIMPLE_EXAMPLE);

      // Close modal to start fresh
      let closeButton = await driver.findElement(
        By.css('button[aria-label="Close"]'),
      );
      closeButton.click();

      await driver.sleep(100);

      // Open modal
      let openModalButton = await driver.findElement(
        By.css('.open-modal-button'),
      );
      openModalButton.click();

      await driver.sleep(100);

      // Dialog should be focused
      const dialog = await driver.findElement(By.css('[role="document"]'));
      let focused = await driver.switchTo().activeElement();
      expect(await dialog.getId()).toBe(await focused.getId());

      // Close modal again
      closeButton = await driver.findElement(
        By.css('button[aria-label="Close"]'),
      );
      closeButton.click();

      await driver.sleep(100);

      // Focus should have transitioned back to button
      openModalButton = await driver.findElement(By.css('.open-modal-button'));
      focused = await driver.switchTo().activeElement();
      expect(await openModalButton.getId()).toBe(await focused.getId());
    });
  });
});
