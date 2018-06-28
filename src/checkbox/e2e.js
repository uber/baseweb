// @flow
import 'babel-polyfill';
import 'chromedriver';
import 'geckodriver';
import webdriver from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';

const {By} = webdriver;
const storyBookUrl =
  'http://localhost:6006/iframe.html?selectedKind=Checkbox&selectedStory=';

const browsers = ['chrome', 'firefox'];

browsers.map(browser => {
  describe('Checkbox Test Suite', function() {
    jest.setTimeout(10000);
    let driver, checkbox;

    beforeAll(async function() {
      const caps = webdriver.Capabilities[browser]();
      driver = new webdriver.Builder()
        .forBrowser(browser)
        .withCapabilities(caps)
        .build();
      await runBrowserAccecibilityTest(driver);
    });

    afterAll(async function() {
      await driver.quit();
    });

    beforeEach(async function() {});

    it('Checked state', async function() {
      const storyName = 'Checkbox example';
      await driver.get(storyBookUrl + storyName);
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
      await driver.get(storyBookUrl + storyName);
      const cboxMain = await getElement(driver, 'label[data-name="radioMain"]');
      const cboxSub1 = await getElement(driver, 'label[data-name="radioSub1"]');
      const cboxSub2 = await getElement(driver, 'label[data-name="radioSub2"]');
      cboxSub1.click();
      cboxSub2.click();
      let checked = await getCheckmarkAttribute(cboxMain, 'checked');
      expect(checked).toBe('true');
    });
  });

  async function getElement(parent, css) {
    return await parent.findElement(By.css(css));
  }
  async function getCheckmarkAttribute(parent, attr) {
    const checkmark = await getElement(parent, 'input[type="checkbox"]');
    return await checkmark.getAttribute(attr);
  }
  async function runBrowserAccecibilityTest(driver) {
    const results = await AxeBuilder(driver).analyze();
    // eslint-disable-next-line no-console
    console.log(results);
  }
});
