const {mount} = require('../../../e2e/helpers');

describe('popover', () => {
  it('should not scroll the page on autoFocus if preventScroll is passed as true to focusOptions', async () => {
    await mount(page, 'popover--prevent-scroll-on-focus');
    await page.waitForSelector('button');

    // Open Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]');

    // Close Popover
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', {hidden: true});

    // Scroll to the last div
    await page.evaluate(() => {
      document.querySelector('div[data-e2e-spacer="8"]').scrollIntoView();
    });

    // Add an Event Listener for page scroll so that we know if the page is scrolled or not
    await page.evaluate(() => {
      document.addEventListener('scroll', () => {
        console.log('__PopOver_preventScroll_Page_Scrolled__');
      }, { once: true });
    });

    // We keep a flag to see if the page is scrolled or not.
    let pageScrolled = false;
    page.once('console', (msg) => {
      pageScrolled = msg.text() === '__PopOver_preventScroll_Page_Scrolled__';
    });
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]');
    expect(pageScrolled).toBe(false);
  });
});