FROM uber/web-base-image:16.15.0-buster

WORKDIR /baseui

# Copy manifests and install dependencies.
# Doing this before a build step can more effectively leverage Docker caching.
COPY package.json yarn.lock /baseui/
RUN yarn

# Copy the current files to the docker image.
COPY . .

# For now, it does the trick - should we think about adding lerna, or something similar?
RUN cd packages/baseweb-vscode-extension && yarn

# Perform any build steps if you want binaries inside of the image
RUN yarn build
RUN yarn e2e:build
