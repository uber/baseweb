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
import e2e from '../../utils/e2e-test-utils';

const {run, By, goToUrl, runBrowserAccecibilityTest, getElement} = e2e;
import {suite, tests} from './examples';

run((driver, browser) => {
  describe(suite, function() {
    beforeEach(function() {
      runBrowserAccecibilityTest(driver, 'label');
    });

    test.skip('Checked state', async function() {
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
