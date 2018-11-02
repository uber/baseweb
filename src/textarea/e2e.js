/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global after */
const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Textarea Test Suite';

const selectors = {
  input: 'textarea[data-test]',
};

describe('The textarea component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.OVERRIDES_EXAMPLE,
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

  it('displays the entered value', browser => {
    const text = 'woooo, base ui!';
    goToUrl({
      suite,
      test: scenarios.OVERRIDES_EXAMPLE,
      browser,
    })
      .waitForElementVisible(selectors.input)
      .setValue(selectors.input, text)
      .getValue(selectors.input, function(result) {
        this.assert.equal(result.value, text);
      });
  });
});
