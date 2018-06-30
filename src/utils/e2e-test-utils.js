// @flow
import webdriver from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';

const {By} = webdriver;

const browsers = ['chrome'];
const activeDrivers = [];
let currentDriver;

const getStoryUrl = function(kind, story) {
  return `http://localhost:6006/iframe.html?selectedKind=${kind}&selectedStory=${story}`;
};

const run = function(testSuite) {
  browsers.forEach(browser => {
    if (!activeDrivers[browsers]) {
      const caps = webdriver.Capabilities[browser]();
      activeDrivers[browsers] = new webdriver.Builder()
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
  driver,
  rootSelector = 'body',
) {
  const builder = AxeBuilder(driver).include(rootSelector);
  const results = await builder.analyze();
  // eslint-disable-next-line no-console
  console.log(results.violations);
};

const getElement = async function(parent: webdriver$WebElementPromise, css: string) {
  return await parent.findElement(By.css(css));
};

export default {
  run,
  getStoryUrl,
  By,
  runBrowserAccecibilityTest,
  getElement,
};
