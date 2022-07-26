/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

test.describe('popover', () => {
  test('should not scroll the page on autoFocus if preventScroll is passed as true to focusOptions', async ({
    browserName,
    page,
  }) => {
    test.fixme(
      browserName === 'firefox' || browserName === 'chromium',
      'this feature fails in firefox and chromium'
    );

    await mount(page, 'popover--prevent-scroll-on-focus');
    await page.waitForSelector('button');

    // Open Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]');

    // Close Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', { state: 'hidden' });

    // Scroll to the last div
    await page.evaluate(() => document.querySelector('div[data-e2e-spacer="1"]').scrollIntoView());

    // Listening to Scroll Event to determine if the page is still scrolling
    // Could wait for few seconds but that would be unreliable
    await page.evaluate(() => {
      function scrollHandler() {
        window.isPageScrolling = true;
        clearTimeout(window.scrollTimer);
        window.scrollTimer = setTimeout(() => {
          window.isPageScrolling = false;
          window.removeEventListener('scroll', scrollHandler);
        }, 100);
      }
      window.addEventListener('scroll', scrollHandler);
    });

    // Add an Event Listener for page scroll so that we know if the page is scrolled or not
    await page.evaluate(() => {
      document.addEventListener(
        'scroll',
        () => {
          console.log('__PopOver_preventScroll_Page_Scrolled__');
        },
        { once: true }
      );
    });

    // Waiting for scroll to end
    await page.waitForFunction(() => window.isPageScrolling === false, { poll: 100 });

    // We keep a flag to see if the page is scrolled or not after this point in the test.
    let pageScrolled = false;
    page.once('console', (msg) => {
      pageScrolled = msg.text() === '__PopOver_preventScroll_Page_Scrolled__';
    });

    // Clicking on button to show Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]');

    // Showing Popover should not trigger a page scroll
    expect(pageScrolled).toBe(false);
  });
});
