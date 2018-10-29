/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

function getUrl({launchUrl, suite, test}) {
  return `${launchUrl}?suite=${encodeURIComponent(
    suite,
  )}&test=${encodeURIComponent(test)}`;
}

function goToUrl({suite, test, browser}) {
  const url = getUrl({launchUrl: browser.launchUrl, suite, test});
  return browser.url(url);
}

function formatFileName(testName) {
  return testName.toLowerCase().replace(/ /g, '-');
}

module.exports = {
  getUrl,
  goToUrl,
  formatFileName,
};
