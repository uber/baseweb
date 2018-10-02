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

function assertVisuals({browser, id}) {
  const fileName = formatFileName(id);

  if (browser.options.desiredCapabilities.isVrt) {
    browser
      .resizeWindow(1024, 768)
      .assert.screenshotIdenticalToBaseline(fileName);
  }
}

module.exports = {
  getUrl,
  goToUrl,
  formatFileName,
  assertVisuals,
};
