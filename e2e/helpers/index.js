/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

function getUrl({launchUrl, suite, test}) {
  return `${launchUrl}?suite=${encodeURIComponent(
    suite,
  )}&test=${encodeURIComponent(test)}`;
}

function goToUrl({suite, test, client}) {
  return client.url(getUrl({launchUrl: client.launchUrl, suite, test}));
}

function formatFileName(testName) {
  return testName.toLowerCase().replace(/ /g, '-');
}

module.exports = {
  getUrl,
  goToUrl,
  formatFileName,
};
