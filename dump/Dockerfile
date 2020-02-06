FROM uber/web-base-image:12.13.0

WORKDIR /baseui

# Copy manifests and install dependencies.
# Doing this before a build step can more effectively leverage Docker caching.
COPY package.json yarn.lock /baseui/
RUN yarn --ignore-scripts
RUN yarn global add now@16.5.2

# Copy the current files to the docker image.
COPY . .

# Perform any build steps if you want binaries inside of the image
RUN yarn build
RUN yarn build:documentation-site-files
