/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

const isServer = typeof window === 'undefined';

let styletron;

export default function getStyletron() {
  if (isServer && !styletron) {
    const Styletron = require('styletron-engine-atomic').Server;
    styletron = new Styletron();
  } else if (!styletron) {
    const Styletron = require('styletron-engine-atomic').Client;
    // eslint-disable-next-line
    const styleElements = document.getElementsByClassName(
      '_styletron_hydrate_',
    );
    styletron = new Styletron(styleElements);
  }
  return styletron;
}

export function flush() {
  const _styletron = styletron;
  styletron = null;
  return _styletron;
}
