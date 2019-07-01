#!/bin/bash

now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN --public --no-clipboard deploy ./public > deployment.txt
now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN alias `cat deployment.txt` "${BUILDKITE_COMMIT}-baseweb"
