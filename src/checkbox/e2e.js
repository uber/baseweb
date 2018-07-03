// @flow
import e2e from '../utils/e2e-test-utils';

const {run, By, getStoryUrl, runBrowserAccecibilityTest, getElement} = e2e;
const storyKind = 'Checkbox';

run((driver, browser) => {
  describe('Checkbox Test Suite', function() {
    beforeEach(function() {
      runBrowserAccecibilityTest(driver, 'label');
    });

    it('Checked state', async function() {
      let checkbox;
      const storyName = 'Checkbox example';
      await driver.get(getStoryUrl(storyKind, storyName));
      checkbox = await driver.findElement(By.css('label'));
      const expectedResult = {
        chrome: 'rgba(27, 109, 222, 1)',
        firefox: 'rgb(27, 109, 222)',
      };
      checkbox.click();
      const img = checkbox.findElement(By.css('span'));
      const imageUrl = await img.getCssValue('background-color');
      expect(imageUrl).toBe(expectedResult[browser]);
    });

    it('Indeterminate state', async function() {
      const storyName = 'Checkbox Indeterminate';
      await driver.get(getStoryUrl(storyKind, storyName));
      const cboxMain = await getElement(driver, 'label[data-name="radioMain"]');
      const cboxSub1 = await getElement(driver, 'label[data-name="radioSub1"]');
      const cboxSub2 = await getElement(driver, 'label[data-name="radioSub2"]');
      cboxSub1.click();
      cboxSub2.click();
      let checked = await getCheckmarkAttribute(cboxMain, 'checked');
      expect(checked).toBe('true');
    });
  });
  async function getCheckmarkAttribute(parent, attr) {
    const checkmark = await getElement(parent, 'input[type="checkbox"]');
    return await checkmark.getAttribute(attr);
  }
});
