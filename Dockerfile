FROM uber/web-base-image:1.0.4

WORKDIR /baseui

# Copy manifests and install dependencies.
# Doing this before a build step can more effectively leverage Docker caching.
COPY package.json yarn.lock /baseui/
RUN yarn --ignore-scripts

# Copy the current files to the docker image.
COPY . .

# Perform any build steps if you want binaries inside of the image
RUN yarn build && patch -p1 < ./node_modules/enzyme-context-patch/patches/enzyme-adapter-react-16+1.1.1.patch
RUN yarn build-storybook
RUN yarn test