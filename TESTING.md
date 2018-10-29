# Testing

## Running end to end tests locally

Build the assets & start serving them using:

```sh
yarn e2e:build && yarn e2e:serve
```

In a new terminal window start the tests using:

```sh
yarn e2e:test
```

## Running end to end tests against Sauce Labs

### Using `docker-compose`

```sh
docker-compose build
BUILDKITE_BUILD_NUMBER=local SAUCE_ACCESS_KEY= SAUCE_USERNAME= docker-compose run e2e-test yarn e2e:test:ci
```

### Using your system

```sh
yarn e2e:build && yarn e2e:serve
yarn localtunnel --port 8000

# grab this url, and launch in a new terminal:
E2E_LAUNCH_URL=the_localltunnel_url SAUCE_ACCESS_KEY=your_key SAUCE_USERNAME=your_username yarn e2e:test:ci
```
