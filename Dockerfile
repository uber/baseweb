FROM node:8.9.0

WORKDIR /baseui

# Copy manifests and install dependencies.
# Doing this before a build step can more effectively leverage Docker caching.
COPY package.json yarn.lock /src/
RUN yarn

# Copy the current files to the docker image.
COPY . .

# Perform any build steps if you want binaries inside of the image
RUN yarn build-storybook