/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global after */
const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Textarea Test Suite';

const selectors = {
  input: 'textarea[placeholder="Uncontrolled textarea"]',
};

describe('The textarea component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
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

  it('preset value is displayed', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      browser,
    })
      .waitForElementVisible(selectors.input)
      .getValue(selectors.input, function(result) {
        this.assert.equal(result.value, 'initial value');
      });
  });
  it('entered value is displayed', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      browser,
    })
      .waitForElementVisible(selectors.input)
      .setValue(selectors.input, ' updated')
      .getValue(selectors.input, function(result) {
        this.assert.equal(result.value, 'initial value updated');
      });
  });
});
