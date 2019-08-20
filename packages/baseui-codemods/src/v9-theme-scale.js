/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {withJsFiles} from '@dubstep/core';

const MAP = {
  // typography
  font100: 'font100',
  font200: 'font100',
  font250: 'font150',
  font300: 'font200',
  font350: 'font250',
  font400: 'font300',
  font450: 'font350',
  font460: 'font400',
  font470: 'font450',
  font500: 'font550',
  font600: 'font650',
  font700: 'font750',
  font800: 'font1050',
  font900: 'font1350',
  font1000: 'font1350',
  font1100: 'font1450',
  // colors
  mono100: 'white',
  mono200: 'mono50',
  mono300: 'mono100',
  mono400: 'mono200',
  mono500: 'mono300',
  mono600: 'mono400',
  mono700: 'mono500',
  mono800: 'mono600',
  mono900: 'mono700',
  mono1000: 'black',
};

async function codemod(options: {dir: string}) {
  await withJsFiles(`${options.dir}/**/*.js`, async path => {
    path.traverse({
      JSXIdentifier(path) {
        if (path.node.name === 'Block') {
          path.parentPath.traverse({
            JSXIdentifier(path) {
              if (path.node.name === 'font' || path.node.name === 'color') {
                path.parentPath.traverse({
                  StringLiteral(path) {
                    const newValue = MAP[path.node.value];
                    if (newValue) path.node.value = newValue;
                  },
                });
              }
            },
          });
        }
      },
      Identifier(path) {
        if (Object.keys(MAP).includes(path.node.name)) {
          const newValue = MAP[path.node.name];
          if (newValue) path.node.name = newValue;
        }
      },
    });
  });
}

export default codemod;
