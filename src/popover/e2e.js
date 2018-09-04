/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import e2e from '../utils/e2e-test-utils';

const {run, By, runBrowserAccecibilityTest, goToUrl} = e2e;
import {suite, tests} from './examples';

run((driver, browser) => {
  describe('Popover Test Suite', function() {
    beforeEach(function() {
      runBrowserAccecibilityTest(driver, 'label');
    });

    it('Checked state', async function() {
      await goToUrl(driver, suite, tests.SIMPLE_EXAMPLE);
      const popover = await driver.findElement(By.id('stateless%20popover'));
      popover.click();
    });
  });
});
