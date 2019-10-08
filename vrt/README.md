# Visual testing

We use jest-image-snapshot for a simple suite of visual regression tests (VRT). Note, that the current system is a work in progress and may change in the future.

## Set up

The suite will pick up and run any test file with the `*.vrt.js` extension. To add a component to the suite you have to create a `vrt.js` file in the component's `__tests__` directory.

```
$ touch src/button/__tests__/button.vrt.js
```

Within this file you can use the vrt helper function to load all the Storybook scenarios as visual tests:

```js
// src/button/__tests__/button.vrt.js
const {vrt} = require('../../../vrt');
vrt('button');
```

That is all you have to do to get all the `button` scenarios covered with a snapshot test.
If you want to add an interaction test, you can pass a second argument to `vrt`.

```js
// src/button/__tests__/button.vrt.js
const {vrt} = require('../../../vrt');
vrt('button', {
  button: [{
    name: 'hoverOverPrimary',
    behavior: async page => await page.hover('button'),
  }],
});
```

The second argument is an object where each key corresponds to a specific scenario name. In the example above, we are adding an interaction test to the `button`, a.k.a. `button.scenario.js` scenario. 

You can then associate an array of interactions with that scenario. In our example we add only one interaction, called `hoverOverPrimary`, and then specify a `behavior`, an async function that is passed the Puppeteer `page` object. The `behavior` function should arrange the page for a snapshot.

Here is an example where we enter text into a clearable input to verify the clear button appears:

```js
// src/input/__tests__/input.vrt.js
const {vrt} = require('../../../vrt');
vrt('input', {
  'input-clearable': [{
    name: 'clearButtonAppears',
    behavior: async page => await page.type('input', 'Move!'),
  }],
});
```

## Docker

The visual regression tests are run within a Docker container so you will have inconsistent results with our saved snapshots if you do not run the tests in Docker.

To run the tests locally you can use `docker-compose`:

To prepare the visual tests:
```
$ docker-compose down    # ensure prior services are not running
$ docker-compose build   # required after any change to source
```

The first run of `docker-compose build` may take a little while. Subsequent runs should go faster.

To run the visual tests:
```
$ docker-compose run e2e-test bash -c "yarn add puppeteer && yarn vrt"
```

To update the visual test snapshots:
```
$ docker-compose run e2e-test bash -c "yarn add puppeteer && yarn vrt -u"
```

Note, you can still run the test suite locally for debugging purposes with `yarn vrt`, but the official snapshots must be generated and updated with Docker. CI will not pass otherwise.

## CI

If your there are visual regressions detected in the `vrt` job, any diffs will be uploaded as artifacts to the build step in Buildkite. Simply follow the link to the failed job, then click the `Artifacts` tab on that job. There should be a list of images that display the offending diffs.

You can then either fix the regressions or update the snapshots locally (see Docker section above).
