// @flow
import e2e from '../../utils/e2e-test-utils';

const {run, By, runBrowserAccecibilityTest, location} = e2e;

run((driver, browser) => {
  describe('Popover Test Suite', function() {
    beforeEach(function() {
      runBrowserAccecibilityTest(driver, 'label');
    });

    it('Checked state', async function() {
      await driver.get(location);
      const popover = await driver.findElement(By.id('stateless%20popover'));
      popover.click();
    });
  });
});
