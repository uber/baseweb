/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {withJsFiles} from '@dubstep/core';

const THEME_TYPOGRAPHY_MAP = {
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
};

const THEME_COLOR_MAP = {
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

const THEME_MAP = {
  ...THEME_TYPOGRAPHY_MAP,
  ...THEME_COLOR_MAP,
};

const COMPONENT_TYPOGRAPHY_MAP = {
  Paragraph1: 'Paragraph3',
  Label1: 'Label3',
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
                    const newValue = THEME_MAP[path.node.value];
                    if (newValue) path.node.value = newValue;
                  },
                });
              }
            },
          });
        } else if (
          Object.keys(COMPONENT_TYPOGRAPHY_MAP).includes(path.node.name)
        ) {
          const newValue = COMPONENT_TYPOGRAPHY_MAP[path.node.name];
          if (newValue) path.node.name = newValue;
        }
      },
      Identifier(path) {
        if (Object.keys(THEME_MAP).includes(path.node.name)) {
          const newValue = THEME_MAP[path.node.name];
          if (newValue) path.node.name = newValue;
        }
      },
      ImportDeclaration(path) {
        path.traverse({
          StringLiteral(path) {
            if (path.node.value === 'baseui/typography') {
              path.parentPath.traverse({
                ImportSpecifier(path) {
                  if (
                    Object.keys(COMPONENT_TYPOGRAPHY_MAP).includes(
                      path.node.imported.name,
                    )
                  ) {
                    const newValue =
                      COMPONENT_TYPOGRAPHY_MAP[path.node.imported.name];
                    const hasLocalAlias =
                      path.node.imported.name !== path.node.local.name;
                    if (newValue) {
                      path.node.imported.name = newValue;
                      if (!hasLocalAlias) path.node.local.name = newValue;
                    }
                  }
                },
              });
            }
          },
        });
      },
    });
  });
}

export default codemod;
