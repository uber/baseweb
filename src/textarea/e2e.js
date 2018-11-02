/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global after */
const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Textarea Test Suite';

const selectors = {
  input: 'input[data-test="e2e"]',
};

describe('The textarea component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.STATE_EXAMPLE,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible(selectors.input)
      .assert.accessibility('html', {
        rules: {
          label: {
            enabled: false,
          },
        },
      });
  });
});
