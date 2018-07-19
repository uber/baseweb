// @flow
import * as webdriver from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';

const {By} = webdriver;

const browsers = ['chrome'];
const activeDrivers = {};
let currentDriver;

const location = 'http://localhost:8080';

const run = function(
  testSuite: (driver: webdriver$WebDriver, browser: string) => void,
) {
  browsers.forEach(browser => {
    if (!activeDrivers[browser]) {
      const browserMethod = webdriver.Capabilities[browser];
      const caps = browserMethod();
      activeDrivers[browser] = new webdriver.Builder()
        .forBrowser(browser)
        .withCapabilities(caps)
        .build();
    }
    afterAll(async function() {
      await currentDriver.quit();
    });
    currentDriver = activeDrivers[browser];
    testSuite(currentDriver, browser);
  });
};

const runBrowserAccecibilityTest = async function(
  driver: webdriver$WebDriver,
  rootSelector: string = 'body',
) {
  const builder = AxeBuilder(driver).include(rootSelector);
  const results = await builder.analyze();
  // eslint-disable-next-line no-console
  console.log(results.violations);
};

const getElement = async function(
  parent: webdriver$WebElement | webdriver$WebDriver,
  css: string,
) {
  return await parent.findElement(By.css(css));
};

export default {
  run,
  By,
  runBrowserAccecibilityTest,
  getElement,
  location,
};
