FROM uber/web-base-image:10.15.2

WORKDIR /baseui

# Copy manifests and install dependencies.
# Doing this before a build step can more effectively leverage Docker caching.
COPY package.json yarn.lock /baseui/
RUN yarn --ignore-scripts
RUN yarn global add now

# Copy the current files to the docker image.
COPY . .

RUN yarn remove puppeteer && yarn add puppeteer

# Perform any build steps if you want binaries inside of the image
RUN yarn build
RUN yarn build-storybook
RUN yarn e2e:build
RUN BUILD_ENV=production yarn documentation:build
