/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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
