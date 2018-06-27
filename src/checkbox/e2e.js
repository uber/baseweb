// @flow
import 'babel-polyfill';
import 'chromedriver';
import 'geckodriver';
import webdriver from 'selenium-webdriver';
import {assert} from 'chai';

const {By} = webdriver;
const storyBookUrl =
  'http://localhost:6006/iframe.html?selectedKind=Checkbox&selectedStory=Checkbox%20example';

const browsers = ['chrome', 'firefox'];

browsers.map(browser => {
  describe('Checkbox Test Suite', function() {
    this.timeout(5000);
    let driver, checkbox;

    before(async function() {
      const caps = webdriver.Capabilities[browser]();
      driver = new webdriver.Builder()
        .forBrowser(browser)
        .withCapabilities(caps)
        .build();
      await driver.get(storyBookUrl);
    });

    after(async function() {
      await driver.quit();
    });

    beforeEach(async function() {
      checkbox = await driver.findElement(By.css('label'));
    });

    it('Checked state', function(done) {
      const expectedResult = {
        chrome: 'rgba(27, 109, 222, 1)',
        firefox: 'rgb(27, 109, 222)',
      };
      checkbox.click();
      const img = checkbox.findElement(By.css('span'));
      img.getCssValue('background-color').then(imageUrl => {
        assert.strictEqual(
          imageUrl,
          expectedResult[browser],
          'Checkbox should be blue when clicked',
        );
        done();
      });
    });
  });
});
