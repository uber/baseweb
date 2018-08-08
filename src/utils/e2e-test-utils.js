/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as webdriver from 'selenium-webdriver';
import AxeBuilder from 'axe-webdriverjs';

const {By} = webdriver;

const browsers = ['chrome'];
const activeDrivers = {};
let currentDriver;

const location = 'http://localhost:8080';

const goToUrl = async function(
  driver: webdriver$WebDriver,
  suite: string,
  test: string,
) {
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
  goToUrl,
  run,
  By,
  runBrowserAccecibilityTest,
  getElement,
  location,
};
