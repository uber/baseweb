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

function assertVisuals({client, id}) {
  const fileName = formatFileName(id);

  if (client.options.desiredCapabilities.isVrt) {
    client
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
