/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as webdriver from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';

const {By} = webdriver;

const browsers = ['chrome'];
const activeDrivers = {};
let currentDriver;

const location = 'http://localhost:8080';

const goToUrl = async function(driver, suite, test) {
  const url = location + `/?suite=${suite}&test=${test}`;
  await driver.get(url);
  let errors = await driver
    .manage()
    .logs()
    .get('browser');
  errors = errors.filter(error => error.message.indexOf('NOT_FOUND_TEST') >= 0);
  if (errors.length) {
    // eslint-disable-next-line no-console
    console.error(errors[0].message);
  }
  await new Promise(resolve => resolve());
};

const run = function(testSuite) {
  browsers.forEach(browser => {
    if (!activeDrivers[browser]) {
      const capabilities = {
        browserName: browser,
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
      };
      activeDrivers[browser] = new webdriver.Builder()
        .forBrowser(browser)
        .withCapabilities(capabilities)
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
  if (results.violations && results.violations.length) {
    // eslint-disable-next-line no-console
    console.log('Accessibility violations: ', results.violations);
  }
};

const getElement = async function(parent, css) {
  return await parent.findElement(By.css(css));
};

export default {
  goToUrl,
  run,
  By,
  runBrowserAccecibilityTest,
  getElement,
  location,
};
