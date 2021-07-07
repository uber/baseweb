FROM uber/web-base-image:14.15.4-buster

WORKDIR /baseui

# Install zhCn fonts
RUN apt update && apt install fonts-wqy-zenhei
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
RUN yarn build:documentation-site-files
RUN yarn e2e:build
