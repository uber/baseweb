// @flow
import e2e from '../../utils/e2e-test-utils';

const {run, By, goToUrl, runBrowserAccecibilityTest, getElement} = e2e;
import {suite, tests} from './examples';

run((driver, browser) => {
  describe(suite, function() {
    beforeEach(function() {
      runBrowserAccecibilityTest(driver, 'label');
    });

    test('Checked state', async function() {
      let checkbox;
      await goToUrl(driver, suite, tests.SIMPLE_EXAMPLE);
      checkbox = await driver.findElement(By.css('label'));
      const expectedResult = {
        chrome: 'rgba(30, 102, 240, 0.243)',
        firefox: 'rgb(30, 102, 240)',
      };
      checkbox.click();
      const img = await checkbox.findElement(By.css('span'));
      const imageUrl = await img.getCssValue('background-color');
      expect(imageUrl.substr(0, 17)).toEqual(
        expectedResult[browser].substr(0, 17),
      );
    });

    test('Indeterminate state', async function() {
      await goToUrl(driver, suite, tests.INDETERMINATE);
      const cbMain = await getElement(driver, '[data-name="radioMain"] label');
      const cbSub1 = await getElement(driver, '[data-name="radioSub1"] label');
      const cbSub2 = await getElement(driver, '[data-name="radioSub2"] label');
      cbSub1.click();
      cbSub2.click();
      let checked = await getCheckmarkAttribute(cbMain, 'checked');
      expect(checked).toBe('true');
    });
  });
  async function getCheckmarkAttribute(parent, attr) {
    const checkmark = await getElement(parent, 'input[type="checkbox"]');
    return await checkmark.getAttribute(attr);
  }
});
