/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */
const { mount } = require('../../../e2e/helpers');

describe('popover', () => {
  it('should not scroll the page on autoFocus if preventScroll is passed as true to focusOptions', async () => {
    await mount(page, 'popover--prevent-scroll-on-focus');
    await page.waitForSelector('button');

    // Open Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]');

    // Close Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', { hidden: true });

    // Scroll to the last div
    await page.evaluate(() =>
      // eslint-disable-next-line cup/no-undef
      document.querySelector('div[data-e2e-spacer="1"]').scrollIntoView()
    );

    // Listening to Scroll Event to determine if the page is still scrolling
    // Could wait for few seconds but that would be unreliable
    await page.evaluate(() => {
      function scrollHandler() {
        /* eslint-disable cup/no-undef */
        window.isPageScrolling = true;
        clearTimeout(window.scrollTimer);
        window.scrollTimer = setTimeout(() => {
          window.isPageScrolling = false;
          window.removeEventListener('scroll', scrollHandler);
        }, 100);
      }
      window.addEventListener('scroll', scrollHandler);
      /* eslint-enable cup/no-undef */
    });

    // Add an Event Listener for page scroll so that we know if the page is scrolled or not
    await page.evaluate(() => {
      // eslint-disable-next-line cup/no-undef
      document.addEventListener(
        'scroll',
        () => {
          console.log('__PopOver_preventScroll_Page_Scrolled__');
        },
        { once: true }
      );
    });

    // Waiting for scroll to end
    await page.waitForFunction('window.isPageScrolling === false');

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
